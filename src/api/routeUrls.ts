export const HUSK_NEURON_BASE_URL = "https://qa.huskneuron.com"

export const EXTERNAL_ROUTES = {
  OVERVIEW: `${HUSK_NEURON_BASE_URL}/global-overview/IN`,

  // Dashboard
  DASHBOARD_SUMMARY: `${HUSK_NEURON_BASE_URL}/Dashboard/Summary`,
  NOC_DASHBOARD: `${HUSK_NEURON_BASE_URL}/noc-dashboard-summary/2`,
  PLANT_DASHBOARD: `${HUSK_NEURON_BASE_URL}/plant-details/HINBR-01-01`,

  // Report
  GENERATE_REPORT: `${HUSK_NEURON_BASE_URL}/generateReports/`,

  // Operations
  CUSTOMER_LIST: `${HUSK_NEURON_BASE_URL}/customer/list`,
  CUSTOMER_DETAILS: `${HUSK_NEURON_BASE_URL}/customer-details`,
  PLANT_360: `${HUSK_NEURON_BASE_URL}/plant360`,
  TARIFFS: `${HUSK_NEURON_BASE_URL}/tariffs/list`,
  PLANT_HEALTH: `${HUSK_NEURON_BASE_URL}/admin/plant-health-check`,
  RECHARGE: `${HUSK_NEURON_BASE_URL}/agent-customer-recharge`,
  IOT_MANAGEMENT: `${HUSK_NEURON_BASE_URL}/IOT-register-feedback-list`,
  EXEC_TRANS: `${HUSK_NEURON_BASE_URL}/executive-transactions-list`,
  MAINTENANCE: `${HUSK_NEURON_BASE_URL}/plant-maintenance`,
  ELECTRICIAN_CM: `${HUSK_NEURON_BASE_URL}/admin/GetElectricianComplaintList`,
  DG_TRACKING: `${HUSK_NEURON_BASE_URL}/DgSerialPlantDetails/List`,
  REVENUE_TARGET: `${HUSK_NEURON_BASE_URL}/NewCustomerRevenueTarget/List`,
  INVENTORY: `${HUSK_NEURON_BASE_URL}/Inventory/List`,
  BIOMASS_MAINT: `${HUSK_NEURON_BASE_URL}/BiomassMaintenance/Plant/List`,

  // Finance
  CASH_PAYMENTS: `${HUSK_NEURON_BASE_URL}/payments/cash-payments`,
  TRANSACTIONS: `${HUSK_NEURON_BASE_URL}/transactions`,
  BANK_DEPOSIT: `${HUSK_NEURON_BASE_URL}/bankdeposit/list`,
  EXPENSES: `${HUSK_NEURON_BASE_URL}/costregister/list`,
  BUDGET: `${HUSK_NEURON_BASE_URL}/budget/list`,
  OFFLINE_METER: `${HUSK_NEURON_BASE_URL}/offlinemeterdetails/list`,

  // Sales
  PRODUCTS: `${HUSK_NEURON_BASE_URL}/product/list`,
  DISCOUNTS: `${HUSK_NEURON_BASE_URL}/discount/list`,
  AGENTS: `${HUSK_NEURON_BASE_URL}/agents`,
  COMMISSION_SCHEMES: `${HUSK_NEURON_BASE_URL}/agent/commissionschemes`,
  PRODUCT_PIPELINE: `${HUSK_NEURON_BASE_URL}/whishlist/list`,
  CUSTOMER_PIPELINE: `${HUSK_NEURON_BASE_URL}/guest-customer-list`,
  VISIT_TRACKING: `${HUSK_NEURON_BASE_URL}/salesExecutiveVisitTracking/list`,

  // Agents
  AGENT_CUSTOMERS: `${HUSK_NEURON_BASE_URL}/agent-customers`,
  AGENT_RECHARGE: `${HUSK_NEURON_BASE_URL}/agent-customer-recharge/0/agent`,
  PLAN_CHANGE: `${HUSK_NEURON_BASE_URL}/customer/plan-change/0/agent`,
  AGENT_DASHBOARD: `${HUSK_NEURON_BASE_URL}/agents`,
  AGENT_CREDIT: `${HUSK_NEURON_BASE_URL}/agent-credit`,

  // Admin
  GENERATION_POTENTIAL: `${HUSK_NEURON_BASE_URL}/admin/generation-potential`,
  PLANTS: `${HUSK_NEURON_BASE_URL}/admin/plant-details`,
  PLANT_PIPELINE: `${HUSK_NEURON_BASE_URL}/PlantPipeline/List`,
  POLE_MANAGEMENT: `${HUSK_NEURON_BASE_URL}/admin/plant-pole-list`,
  COUNTRY: `${HUSK_NEURON_BASE_URL}/admin/country`,
  STATES: `${HUSK_NEURON_BASE_URL}/admin/StateProvince`,
  NOC: `${HUSK_NEURON_BASE_URL}/tariffs/block-rate-type/list`,
  BLOCK_RATE: `${HUSK_NEURON_BASE_URL}/tariffs/tou-period-type/list`,
  TEMPLATE: `${HUSK_NEURON_BASE_URL}/admin/template-list`,
  CAMPAIGN: `${HUSK_NEURON_BASE_URL}/admin/campaign-list`,
  MANUAL_PAYMENTS: `${HUSK_NEURON_BASE_URL}/manual-cash-payments`,
  TICKET_PDT: `${HUSK_NEURON_BASE_URL}/ticket-list`,
  OPS_DASHBOARD_SUMMARY: `${HUSK_NEURON_BASE_URL}/admin/Operation-Dashboard-Monthly-Summary`,
  CUSTOMER_DASHBOARD_SUMMARY: `${HUSK_NEURON_BASE_URL}/admin/Customer-Dashboard-Monthly-Summary`,
  FINANCE_DASHBOARD_SUMMARY: `${HUSK_NEURON_BASE_URL}/admin/Finance-Dashboard-Monthly-Summary`,
  EMPLOYEE_INFO: `${HUSK_NEURON_BASE_URL}/Employee/list`,
  INVENTORY_CONFIG: `${HUSK_NEURON_BASE_URL}/Inventory/ItemAttribute/List`,
  SETTING: `${HUSK_NEURON_BASE_URL}/Setting/List`,
  REPORT_SCHEDULER: `${HUSK_NEURON_BASE_URL}/EmailTemplate/List`,
  CUSTOMER_REWARDS: `${HUSK_NEURON_BASE_URL}/RewardProduct/List`,

  // CRM
  KYC_DETAILS: `${HUSK_NEURON_BASE_URL}/kyc/list`,
  CUSTOMER_COMPLAINTS: `${HUSK_NEURON_BASE_URL}/customer-complaints`,
  CUSTOMER_SURVEY: `${HUSK_NEURON_BASE_URL}/customer-survey`,

  // Access Control
  USERS: `${HUSK_NEURON_BASE_URL}/user/list`,
  USER_ROLES: `${HUSK_NEURON_BASE_URL}/userRole/list`,
  PERMISSIONS: `${HUSK_NEURON_BASE_URL}/permissionrecord/list`,
  PERMISSION_CATEGORIES: `${HUSK_NEURON_BASE_URL}/permission-category-list`,
  ACL: `${HUSK_NEURON_BASE_URL}/Security/Permissions?module=Neuron&categoryId=0`,

  // Logs
  SYSTEM_LOGS: `${HUSK_NEURON_BASE_URL}/logs/list`,
  API_LOGS: `${HUSK_NEURON_BASE_URL}/logs/apilist`,
  USER_ACTIVITY: `${HUSK_NEURON_BASE_URL}/user/activity`,
  USER_LOG_TIME: `${HUSK_NEURON_BASE_URL}/UserLogTime/List`,
};
