const resumePath = 'Keerthi_Resume.pdf';

function downloadResume() {
  const win = window.open(resumePath, '_blank', 'noopener');
  if (!win) {
    const link = document.createElement('a');
    link.href = resumePath;
    link.target = '_blank';
    link.rel = 'noopener';
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
}

const tabs = [
  { buttonId: 't-about', panelId: 'p-about' },
  { buttonId: 't-exp', panelId: 'p-exp' },
  { buttonId: 't-skill', panelId: 'p-skill' },
  { buttonId: 't-cred', panelId: 'p-cred' },
  { buttonId: 't-contact', panelId: 'p-contact' }
];

function setTab(id) {
  tabs.forEach((tab) => {
    const button = document.getElementById(tab.buttonId);
    const panel = document.getElementById(tab.panelId);
    const isSelected = tab.buttonId === id;

    if (button) {
      button.setAttribute('aria-selected', String(isSelected));
      button.setAttribute('tabindex', isSelected ? '0' : '-1');
    }

    if (panel) {
      panel.hidden = !isSelected;
    }
  });
}

function enableTabs() {
  tabs.forEach((tab, index) => {
    const button = document.getElementById(tab.buttonId);
    if (!button) return;

    button.addEventListener('click', () => setTab(tab.buttonId));
    button.addEventListener('keydown', (event) => {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
      event.preventDefault();

      const direction = event.key === 'ArrowRight' ? 1 : -1;
      const nextIndex = (index + direction + tabs.length) % tabs.length;
      const nextButton = document.getElementById(tabs[nextIndex].buttonId);
      if (nextButton) {
        nextButton.focus();
        setTab(tabs[nextIndex].buttonId);
      }
    });
  });

  setTab('t-exp');
}

const jobs = [
  {
    company: 'Genpact (Client: Kaiser Permanente)',
    role: 'Lead Data Engineer',
    location: 'Houston, TX',
    period: 'May 2024 – Present',
    env: [
      'AWS Connect',
      'Glue',
      'S3',
      'Lambda',
      'RDS MySQL',
      'Bedrock',
      'Lex',
      'Python',
      'SQL'
    ],
    ach: 'POC adopted for pilot; unblocked agent experience design and analytics feasibility.',
    bullets: [
      'Delivered a POC of Amazon Connect with intelligent routing, sentiment, and patient-data integration; received strong stakeholder feedback.',
      'Built Glue ETL to land CSVs from S3 into RDS, and modeled a star schema (facts/dimensions).',
      'Created a Patient 360 Agent Workspace dashboard using de-identified data; ensured HIPAA-safe workflows.',
      'Exposed patient data via Lambda APIs (VPC) into Connect flows/widgets; end-to-end monitoring with CloudWatch.',
      'Generated synthetic datasets; prototyped AI-driven analytics for sentiment, call quality, and CX scoring.'
    ]
  },
  {
    company: 'Landry’s / Tachus',
    role: 'Lead Data Engineer',
    location: 'Houston, TX',
    period: 'Aug 2023 – May 2024',
    env: [
      'Databricks',
      'Delta Live Tables',
      'Snowflake',
      'Azure ADF',
      'Fivetran',
      'Splink',
      'SQL',
      'PySpark'
    ],
    ach: 'Entity resolution improved match precision and cut manual review effort significantly.',
    bullets: [
      'Built Delta Live Tables pipelines and custom PySpark transforms for high-quality curated data.',
      'Automated deployments via Azure DevOps; integrated sources using Fivetran.',
      'Implemented Splink ML entity-resolution to deduplicate customer profiles and reduce false positives.',
      'Designed scalable Snowflake/ADF ETL for continuous loads; orchestrated near real-time processing.',
      'Delivered SSIS-based bridges where needed to connect on-prem to cloud.'
    ]
  },
  {
    company: 'Impetus (Client: Ally)',
    role: 'Module Lead Engineer',
    period: 'Dec 2022 – Aug 2024',
    env: ['Snowflake', 'Qlik Replicate', 'dbt', 'Snowpark', 'Tosca', 'Python', 'SQL'],
    ach: 'Seamless cutover with minimal downtime; standardized dbt patterns for teams.',
    bullets: [
      'Led Oracle→Snowflake migration strategy and execution with Qlik Replicate.',
      'Engineered Snowflake objects (tables, views, procs, tasks/streams, stages, sharing) with best practices.',
      'Built incremental dbt models with versioning and documentation; ported PL/SQL to Snowpark.',
      'Instituted automated testing with Tosca for data quality and compliance.'
    ]
  },
  {
    company: 'Impetus (Client: Norfolk Southern)',
    role: 'Module Lead Engineer',
    period: 'Jan 2022 – Dec 2022',
    env: ['Databricks', 'Delta Lake', 'PySpark', 'Kafka', 'DB2', 'AWS'],
    ach: 'Modernized critical mainframe feeds; enabled real-time analytics.',
    bullets: [
      'Analyzed COBOL/JCL/DB2 code and designed target data lake (bronze/silver/gold).',
      'Refactored legacy logic into PySpark; introduced DLT for ACID and lineage.',
      'Integrated Kafka for streaming ingestion; added unit tests and validations.'
    ]
  },
  {
    company: 'Capricorn (Client: Meridian Cooperative)',
    role: 'Senior Software Engineer',
    period: 'Feb 2019 – Jan 2022',
    env: ['Snowflake', 'AWS Glue', 'Lambda', 'NiFi', 'Airflow', 'Oracle', 'SQL'],
    ach: 'Reduced ingestion latency from days to hours using Snowpipe+Lambda.',
    bullets: [
      'Designed Oracle→Snowflake flows with Snowpipe and event-driven Glue triggers.',
      'Orchestrated on-prem extracts with NiFi into S3; scheduled with Airflow.',
      'Built SQL/ETL assets with robust QA and stakeholder alignment.'
    ]
  },
  {
    company: 'Capricorn (Client: SEDC)',
    role: 'Software Engineer',
    period: 'Dec 2016 – Jan 2019',
    env: ['Oracle', '.NET', 'MF COBOL', 'Linux'],
    ach: 'Accelerated release cycles via scripting and documentation.',
    bullets: [
      'Converted specs to technical designs; delivered features across mixed stacks.',
      'Automated ops using Unix shell scripts; enforced unit-test discipline.'
    ]
  },
  {
    company: 'Blueliner (Client: MSC)',
    role: 'Software Engineer',
    period: 'Jan 2012 – Nov 2016',
    env: ['COBOL', 'JCL', 'DB2', 'VSAM', 'CICS'],
    ach: 'Consistent on-time delivery for core shipping modules.',
    bullets: [
      'Developed COBOL programs with DB2; maintained quality and standards.',
      'Collaborated on defect triage and performance fixes.'
    ]
  }
];

function jobNode(job) {
  const wrapper = document.createElement('article');
  wrapper.className = 'card job';
  wrapper.innerHTML = `
    <div class="head">
      <div>
        <div style="font-weight:700">${job.role} • ${job.company}</div>
        <div style="color:var(--muted);font-size:14px;margin-top:2px">${job.period}${
          job.location ? ` · ${job.location}` : ''
        }</div>
      </div>
    </div>
    <div class="ach">${job.ach}</div>
    <div class="env chips">${(job.env || [])
      .map((item) => `<span class="chip">${item}</span>`)
      .join('')}</div>
    <details>
      <summary>See responsibilities & impact</summary>
      <ul class="list">${(job.bullets || [])
        .map((bullet) => `<li>${bullet}</li>`)
        .join('')}</ul>
    </details>
  `;
  return wrapper;
}

const jobsContainer = document.getElementById('jobs');

function renderJobs(filter = '') {
  if (!jobsContainer) return;

  jobsContainer.innerHTML = '';
  const query = filter.trim().toLowerCase();

  jobs
    .filter((job) => !query || JSON.stringify(job).toLowerCase().includes(query))
    .forEach((job) => jobsContainer.appendChild(jobNode(job)));
}

function enableFilter() {
  const filterInput = document.getElementById('filter');
  if (!filterInput) return;

  filterInput.addEventListener('input', (event) => {
    renderJobs(event.target.value);
  });
}

function runSelfTests() {
  try {
    console.assert(typeof downloadResume === 'function', 'downloadResume is a function');
    console.assert(document.getElementById('t-exp'), 'Tabs present');
    setTab('t-about');
    console.assert(!document.getElementById('p-about').hidden, 'About visible');
    setTab('t-exp');
    console.assert(!document.getElementById('p-exp').hidden, 'Experience visible');
    console.assert(
      document.getElementById('jobs').children.length === jobs.length,
      'Jobs rendered'
    );
    console.log('%cSelf-tests passed', 'color:green');
  } catch (error) {
    console.warn('Self-tests warning', error);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  enableTabs();
  renderJobs();
  enableFilter();
  runSelfTests();
});

window.downloadResume = downloadResume;
