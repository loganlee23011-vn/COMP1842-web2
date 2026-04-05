<template>
  <section id="features" class="feature-band">
    <div class="landing-container">
      <div class="section-head">
        <span class="badge">Core Features</span>
        <h2>Built for the coursework and ready for demo</h2>
        <p>Everything on the site maps back to your helpdesk response library scenario.</p>
      </div>

      <div class="feature-grid">
        <article class="feature-card">
          <h3>CRUD Response Library</h3>
          <p>Create, edit, search, and delete issue-code responses with category and assigned staff or team.</p>
        </article>
        <article class="feature-card">
          <h3>Staff Training Quiz</h3>
          <p>Test staff knowledge by matching issue codes to the correct approved response.</p>
        </article>
        <article class="feature-card">
          <h3>Reports and Staff</h3>
          <p>View category summaries, assignment coverage, and registered helpdesk staff members.</p>
        </article>
      </div>
    </div>
  </section>

  <section id="preview" class="preview preview-section-break">
    <div class="landing-container">
      <div class="section-head">
        <span class="badge">Preview</span>
        <h2>One workspace for support operations</h2>
        <p>Use the tabs to show different parts of the system during your coursework demo.</p>
      </div>

      <div class="preview__tabs">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          class="tab-btn"
          :class="{ active: activeTab === tab.key }"
          @click="activeTab = tab.key"
        >
          {{ tab.label }}
        </button>
      </div>

      <div class="preview__frame">
        <div class="frame-chrome">
          <div class="chrome-dots">
            <div class="chrome-dot"></div>
            <div class="chrome-dot"></div>
            <div class="chrome-dot"></div>
          </div>
          <div class="chrome-bar">https://deskflow.local</div>
        </div>

        <div class="frame-main">
          <template v-if="activeTab === 'dashboard'">
            <div class="img-placeholder giant">
              <div class="ph-icon">IMG</div>
              <strong>Dashboard Screenshot Area</strong>
              <span>Replace this whole area with one large dashboard image later.</span>
            </div>
          </template>

          <template v-if="activeTab === 'reports'">
            <div class="img-placeholder giant">
              <div class="ph-icon">IMG</div>
              <strong>Reports Screenshot Area</strong>
              <span>Replace this whole area with one large reports image later.</span>
            </div>
          </template>

          <template v-if="activeTab === 'agents'">
            <div class="img-placeholder giant">
              <div class="ph-icon">IMG</div>
              <strong>Staff Screenshot Area</strong>
              <span>Replace this whole area with one large staff image later.</span>
            </div>
          </template>

          <template v-if="activeTab === 'ticket'">
            <div class="img-placeholder giant">
              <div class="ph-icon">IMG</div>
              <strong>New Entry Screenshot Area</strong>
              <span>Replace this whole area with one large entry form image later.</span>
            </div>
          </template>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'LandingPreview',
  data() {
    return {
      activeTab: 'dashboard',
      tabs: [
        { key: 'dashboard', label: 'Dashboard' },
        { key: 'reports', label: 'Reports' },
        { key: 'agents', label: 'Staff' },
        { key: 'ticket', label: 'New Entry' },
      ],
    }
  },
}
</script>

<style scoped>
.feature-band,
.preview {
  padding: 74px 0;
}

.preview-section-break {
  background:
    linear-gradient(180deg, #f7f6f2 0%, #ffffff 14%, #ffffff 100%);
  border-top: 1px solid rgba(0, 0, 0, 0.04);
}

.section-head {
  text-align: center;
  display: grid;
  gap: 14px;
  justify-items: center;
  margin-bottom: 40px;
}

.section-head h2 {
  font-family: var(--font-display);
  font-size: clamp(28px, 4vw, 44px);
  line-height: 1.15;
  margin: 0;
}

.section-head p {
  color: var(--clr-muted);
  line-height: 1.7;
  max-width: 620px;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
}

.feature-card {
  padding: 24px;
  background: var(--clr-surface);
  border: 1px solid var(--clr-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
}

.feature-card h3 {
  margin: 0 0 10px;
}

.feature-card p {
  color: var(--clr-muted);
}

.preview__tabs {
  display: flex;
  justify-content: center;
  gap: 4px;
  margin-bottom: 40px;
  background: var(--clr-surface);
  border: 1px solid var(--clr-border);
  border-radius: var(--radius-md);
  padding: 4px;
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
}

.tab-btn {
  font-size: 13px;
  font-weight: 500;
  padding: 8px 20px;
  border: 0;
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--clr-muted);
  cursor: pointer;
}

.tab-btn.active {
  background: var(--clr-text);
  color: #fff;
}

.preview__frame {
  border-radius: var(--radius-xl);
  border: 1.5px solid var(--clr-border);
  box-shadow: var(--shadow-lg);
  background: var(--clr-surface);
  overflow: hidden;
  min-height: 480px;
}

.frame-chrome {
  background: var(--clr-bg);
  border-bottom: 1px solid var(--clr-border);
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.chrome-dots {
  display: flex;
  gap: 6px;
}

.chrome-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.chrome-dot:nth-child(1) { background: #ff5f56; }
.chrome-dot:nth-child(2) { background: #ffbd2e; }
.chrome-dot:nth-child(3) { background: #27c93f; }

.chrome-bar {
  flex: 1;
  background: var(--clr-surface);
  border: 1px solid var(--clr-border);
  border-radius: 6px;
  height: 26px;
  padding: 0 10px;
  font-size: 11px;
  color: var(--clr-muted);
  display: flex;
  align-items: center;
  max-width: 360px;
  margin: 0 auto;
}

.frame-main {
  padding: 24px;
}

.img-placeholder {
  background: linear-gradient(180deg, #fbfbfb 0%, #f4f1ea 100%);
  border: 2px dashed var(--clr-border);
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  color: var(--clr-muted);
  font-size: 12px;
  text-align: center;
  padding: 24px;
}

.img-placeholder.giant {
  min-height: 420px;
}

.ph-icon {
  font-size: 28px;
  font-weight: 700;
  letter-spacing: 0.08em;
  opacity: 0.55;
}

.img-placeholder strong {
  color: var(--clr-text);
  font-size: 18px;
}

@media (max-width: 900px) {
  .feature-grid {
    grid-template-columns: 1fr;
  }

  .img-placeholder.giant {
    min-height: 300px;
  }
}
</style>
