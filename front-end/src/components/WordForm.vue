<template>
  <form action="#" class="ui form" @submit.prevent="onSubmit">
    <p v-if="errorsPresent" class="error">Please complete the issue code, response, category, and assignment fields.</p>

    <div class="ui labeled input fluid">
      <div class="ui label">
        Issue Code
      </div>
      <input v-model="formWord.key" type="text" placeholder="e.g. PWD_RESET" />
    </div>

    <div class="field">
      <label>Standard Response</label>
      <textarea
        v-model="formWord.response"
        rows="5"
        placeholder="Enter the approved helpdesk response..."
      ></textarea>
    </div>

    <div class="ui labeled input fluid">
      <div class="ui label">
        Category
      </div>
      <input v-model="formWord.category" type="text" placeholder="e.g. Accounts, Security, Billing" />
    </div>

    <div class="field">
      <label>Assignment Type</label>
      <select v-model="formWord.assignmentType" class="ui fluid dropdown">
        <option value="staff">Staff</option>
        <option value="team">Team</option>
      </select>
    </div>

    <div v-if="formWord.assignmentType === 'staff'" class="field">
      <label>Assigned Staff</label>
      <select v-model="formWord.assignedUserId" class="ui fluid dropdown">
        <option value="">Select staff</option>
        <option v-for="staff in staffOptions" :key="staff._id" :value="staff._id">
          {{ staff.name }}
        </option>
      </select>
    </div>

    <div v-else class="field">
      <label>Assigned Team</label>
      <select v-model="formWord.agent" class="ui fluid dropdown">
        <option value="">Select team</option>
        <option v-for="team in teamOptions" :key="team" :value="team">
          {{ team }}
        </option>
      </select>
    </div>

    <button class="positive ui button">Submit</button>
  </form>
</template>

<script>
import { api } from '../helpers/helpers/helpers'

const TEAM_OPTIONS = ['IT Support Team', 'Network Team', 'Accounts Team', 'Billing Team', 'Security Team']

export default {
  name: 'WordForm',
  props: {
    word: {
      type: Object,
      required: false,
      default: () => ({
        key: '',
        response: '',
        category: '',
        assignmentType: 'staff',
        assignedUserId: '',
        agent: '',
      }),
    },
  },
  emits: ['createOrUpdate'],
  data() {
    return {
      errorsPresent: false,
      staffOptions: [],
      teamOptions: TEAM_OPTIONS,
      formWord: {
        key: '',
        response: '',
        category: '',
        assignmentType: 'staff',
        assignedUserId: '',
        agent: '',
      },
    }
  },
  watch: {
    word: {
      immediate: true,
      deep: true,
      handler(newWord) {
        const inferredType = newWord?.assignmentType
          || (TEAM_OPTIONS.includes(newWord?.agent) ? 'team' : 'staff')

        this.formWord = {
          ...(newWord || {}),
          key: newWord?.key || '',
          response: newWord?.response || '',
          category: newWord?.category || '',
          assignmentType: inferredType,
          assignedUserId: newWord?.assignedUserId || '',
          agent: newWord?.agent || '',
        }
      },
    },
    'formWord.assignmentType'(value) {
      if (value === 'staff') {
        this.formWord.agent = ''
      } else {
        this.formWord.assignedUserId = ''
      }
    },
  },
  async mounted() {
    this.staffOptions = await api.getUsers()
    if (
      this.formWord.assignmentType === 'staff'
      && !this.formWord.assignedUserId
      && this.formWord.agent
    ) {
      const matchedStaff = this.staffOptions.find((staff) => staff.name === this.formWord.agent)
      if (matchedStaff) {
        this.formWord.assignedUserId = matchedStaff._id
      }
    }
  },
  methods: {
    onSubmit() {
      const missingBase = (
        this.formWord.key.trim() === ''
        || this.formWord.response.trim() === ''
        || this.formWord.category.trim() === ''
      )

      const missingAssignment = (
        (this.formWord.assignmentType === 'staff' && this.formWord.assignedUserId === '')
        || (this.formWord.assignmentType === 'team' && this.formWord.agent.trim() === '')
      )

      if (missingBase || missingAssignment) {
        this.errorsPresent = true
        return
      }

      const selectedStaff = this.staffOptions.find((staff) => staff._id === this.formWord.assignedUserId)
      const assignmentName = this.formWord.assignmentType === 'staff'
        ? selectedStaff?.name || 'Unassigned'
        : this.formWord.agent.trim()

      this.errorsPresent = false
      this.$emit('createOrUpdate', {
        ...this.formWord,
        key: this.formWord.key.trim().toUpperCase(),
        response: this.formWord.response.trim(),
        category: this.formWord.category.trim(),
        assignmentType: this.formWord.assignmentType,
        assignedUserId: this.formWord.assignmentType === 'staff' ? this.formWord.assignedUserId : null,
        agent: assignmentName,
      })
    },
  },
}
</script>

<style scoped>
.error {
  color: #9f3a38;
  margin-bottom: 12px;
}

textarea {
  min-height: 120px;
}
</style>
