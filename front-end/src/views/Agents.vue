<template>
  <div class="staff-page">
    <div class="page-header">
      <div>
        <h1>Support Staff Directory</h1>
      </div>
      <RouterLink class="ui primary button action-button" :to="{ name: 'register' }">Add Staff</RouterLink>
    </div>

    <div class="ui three stackable cards">
      <div class="ui card summary-card">
        <div class="content">
          <div class="header">All Staff</div>
          <div class="description stat">{{ users.length }}</div>
        </div>
      </div>

      <div class="ui card summary-card">
        <div class="content">
          <div class="header">Departments</div>
          <div class="description stat">{{ departments.length }}</div>
        </div>
      </div>

      <div class="ui card summary-card">
        <div class="content">
          <div class="header">Latest Join Date</div>
          <div class="description stat date-stat">{{ latestJoinDate }}</div>
        </div>
      </div>
    </div>

    <table class="ui celled compact table staff-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Department</th>
          <th>Role</th>
          <th>Joined</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user._id">
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.department }}</td>
          <td>{{ user.role }}</td>
          <td>{{ formatDate(user.createdAt) }}</td>
        </tr>
      </tbody>
    </table>

    <p v-if="users.length === 0" class="empty-copy">No registered staff yet. Use Register to create the first account.</p>
  </div>
</template>

<script>
import { api } from '../helpers/helpers/helpers'

export default {
  name: 'AgentsView',
  data() {
    return {
      users: [],
    }
  },
  computed: {
    departments() {
      return [...new Set(this.users.map((user) => user.department).filter(Boolean))]
    },
    latestJoinDate() {
      if (this.users.length === 0) return 'N/A'
      const sorted = [...this.users]
        .filter((user) => user.createdAt)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      return sorted[0] ? this.formatDate(sorted[0].createdAt) : 'N/A'
    },
  },
  methods: {
    formatDate(value) {
      return value ? new Date(value).toLocaleDateString() : 'N/A'
    },
  },
  async mounted() {
    this.users = await api.getUsers()
  },
}
</script>

<style scoped>
.staff-page {
  display: grid;
  gap: 20px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  flex-wrap: wrap;
}

.empty-copy {
  color: #64748b;
  margin-top: 8px;
}

.summary-card {
  background: #f8fbff;
}

.stat {
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
  margin-top: 10px;
}

.date-stat {
  font-size: 1.6rem;
}

.action-button {
  white-space: nowrap;
  min-width: 140px;
}

.staff-table td {
  vertical-align: top;
}
</style>
