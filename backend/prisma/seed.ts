import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🏦 Starting Banking-Grade Database Seed...');
  console.log('🇰🇪 Creating Kenyan Financial Institutions...\n');

  // ========================================
  // CREATE MAJOR KENYAN BANKS & FINTECH
  // ========================================

  const equityBank = await prisma.tenant.upsert({
    where: { slug: 'equity-bank-ke' },
    update: {},
    create: {
      id: 'tenant-equity-bank',
      name: 'Equity Bank Kenya',
      slug: 'equity-bank-ke',
      type: 'BANK',
      status: 'ACTIVE',
      licenseNumber: 'CBK/001/2024',
      regulator: 'Central Bank of Kenya',
      complianceScore: 87,
      lastAuditDate: new Date('2024-01-15'),
      encryptionLevel: 'AES_256',
      dataRetentionDays: 2555,
      backupFrequency: 'HOURLY',
      employeeCount: 12000,
      customerCount: 15000000,
      annualRevenue: 45000000000, // 45B KES
      address: 'Equity Centre, 9th Floor, Upper Hill, Nairobi',
      phone: '+254 20 2264000',
      email: 'info@equitybank.co.ke',
      website: 'https://www.equitybank.co.ke'
    },
  });

  const kcbBank = await prisma.tenant.upsert({
    where: { slug: 'kcb-bank-ke' },
    update: {},
    create: {
      id: 'tenant-kcb-bank',
      name: 'KCB Bank Kenya',
      slug: 'kcb-bank-ke',
      type: 'BANK',
      status: 'ACTIVE',
      licenseNumber: 'CBK/002/2024',
      regulator: 'Central Bank of Kenya',
      complianceScore: 92,
      lastAuditDate: new Date('2024-02-01'),
      encryptionLevel: 'AES_256',
      dataRetentionDays: 2555,
      backupFrequency: 'HOURLY',
      employeeCount: 8000,
      customerCount: 12000000,
      annualRevenue: 38000000000, // 38B KES
      address: 'KCB Plaza, 1st Floor, Nairobi',
      phone: '+254 20 3274747',
      email: 'info@kcb.co.ke',
      website: 'https://www.kcb.co.ke'
    },
  });

  const safaricomMpesa = await prisma.tenant.upsert({
    where: { slug: 'safaricom-mpesa' },
    update: {},
    create: {
      id: 'tenant-safaricom-mpesa',
      name: 'Safaricom M-Pesa',
      slug: 'safaricom-mpesa',
      type: 'FINTECH',
      status: 'ACTIVE',
      licenseNumber: 'CBK/003/2024',
      regulator: 'Central Bank of Kenya',
      complianceScore: 89,
      lastAuditDate: new Date('2024-01-30'),
      encryptionLevel: 'AES_512',
      dataRetentionDays: 2555,
      backupFrequency: 'HOURLY',
      employeeCount: 5000,
      customerCount: 50000000,
      annualRevenue: 25000000000, // 25B KES
      address: 'Safaricom House, Waiyaki Way, Westlands, Nairobi',
      phone: '+254 722 002100',
      email: 'info@safaricom.co.ke',
      website: 'https://www.safaricom.co.ke'
    },
  });

  const coOpBank = await prisma.tenant.upsert({
    where: { slug: 'co-op-bank-ke' },
    update: {},
    create: {
      id: 'tenant-co-op-bank',
      name: 'Co-operative Bank of Kenya',
      slug: 'co-op-bank-ke',
      type: 'BANK',
      status: 'ACTIVE',
      licenseNumber: 'CBK/004/2024',
      regulator: 'Central Bank of Kenya',
      complianceScore: 85,
      lastAuditDate: new Date('2024-01-20'),
      encryptionLevel: 'AES_256',
      dataRetentionDays: 2555,
      backupFrequency: 'DAILY',
      employeeCount: 6000,
      customerCount: 8000000,
      annualRevenue: 28000000000, // 28B KES
      address: 'Co-op Bank House, Haile Selassie Avenue, Nairobi',
      phone: '+254 20 2777000',
      email: 'info@co-opbank.co.ke',
      website: 'https://www.co-opbank.co.ke'
    },
  });

  const absaBank = await prisma.tenant.upsert({
    where: { slug: 'absa-bank-ke' },
    update: {},
    create: {
      id: 'tenant-absa-bank',
      name: 'ABSA Bank Kenya',
      slug: 'absa-bank-ke',
      type: 'BANK',
      status: 'ACTIVE',
      licenseNumber: 'CBK/005/2024',
      regulator: 'Central Bank of Kenya',
      complianceScore: 90,
      lastAuditDate: new Date('2024-02-15'),
      encryptionLevel: 'AES_256',
      dataRetentionDays: 2555,
      backupFrequency: 'HOURLY',
      employeeCount: 4000,
      customerCount: 6000000,
      annualRevenue: 22000000000, // 22B KES
      address: 'ABSA Towers, 3rd Floor, Waiyaki Way, Westlands, Nairobi',
      phone: '+254 20 4251000',
      email: 'info@absabank.co.ke',
      website: 'https://www.absabank.co.ke'
    },
  });

  console.log('✅ Created Major Kenyan Financial Institutions:');
  console.log(`   🏦 ${equityBank.name} (${equityBank.type})`);
  console.log(`   🏦 ${kcbBank.name} (${kcbBank.type})`);
  console.log(`   📱 ${safaricomMpesa.name} (${safaricomMpesa.type})`);
  console.log(`   🏦 ${coOpBank.name} (${coOpBank.type})`);
  console.log(`   🏦 ${absaBank.name} (${absaBank.type})`);

  // ========================================
  // CREATE BRANCHES FOR EQUITY BANK
  // ========================================

  const equityBranches = await Promise.all([
    prisma.branch.upsert({
      where: { id: 'branch-equity-nbi-main' },
      update: {},
      create: {
        id: 'branch-equity-nbi-main',
        name: 'Equity Centre - Main Branch',
        code: 'NBI001',
        address: 'Equity Centre, 9th Floor, Upper Hill, Nairobi',
        phone: '+254 20 2264000',
        email: 'nbi.main@equitybank.co.ke',
        customerCount: 2500000,
        transactionVolume: 15000000000, // 15B KES
        latitude: -1.2921,
        longitude: 36.8219,
        timezone: 'Africa/Nairobi',
        isActive: true,
        openingHours: '8:00 AM - 5:00 PM',
        tenantId: equityBank.id,
      },
    }),
    prisma.branch.upsert({
      where: { id: 'branch-equity-mom' },
      update: {},
      create: {
        id: 'branch-equity-mom',
        name: 'Mombasa Branch',
        code: 'MOM001',
        address: 'Mombasa CBD, Moi Avenue, Mombasa',
        phone: '+254 41 2220000',
        email: 'mombasa@equitybank.co.ke',
        customerCount: 800000,
        transactionVolume: 8000000000, // 8B KES
        latitude: -4.0435,
        longitude: 39.6682,
        timezone: 'Africa/Nairobi',
        isActive: true,
        openingHours: '8:00 AM - 5:00 PM',
        tenantId: equityBank.id,
      },
    }),
    prisma.branch.upsert({
      where: { id: 'branch-equity-kis' },
      update: {},
      create: {
        id: 'branch-equity-kis',
        name: 'Kisumu Branch',
        code: 'KIS001',
        address: 'Kisumu CBD, Oginga Odinga Street, Kisumu',
        phone: '+254 57 2020000',
        email: 'kisumu@equitybank.co.ke',
        customerCount: 500000,
        transactionVolume: 5000000000, // 5B KES
        latitude: -0.1022,
        longitude: 34.7617,
        timezone: 'Africa/Nairobi',
        isActive: true,
        openingHours: '8:00 AM - 5:00 PM',
        tenantId: equityBank.id,
      },
    }),
  ]);

  console.log(`\n🏢 Created ${equityBranches.length} branches for ${equityBank.name}`);

  // ========================================
  // CREATE COMPLIANCE FRAMEWORKS
  // ========================================

  const complianceFrameworks = await Promise.all([
    prisma.complianceFramework.upsert({
      where: { id: 'framework-iso27001' },
      update: {},
      create: {
        id: 'framework-iso27001',
        name: 'ISO 27001:2022',
        version: '2022',
        type: 'INTERNATIONAL',
        regulator: 'ISO',
        status: 'CERTIFIED',
        certificationDate: new Date('2023-06-15'),
        expiryDate: new Date('2026-06-15'),
        nextAuditDate: new Date('2025-06-15'),
        currentScore: 87,
        targetScore: 90,
        gapCount: 13,
        riskCount: 8,
        totalRequirements: 114,
        implementedRequirements: 99,
        pendingRequirements: 15,
        policyDocuments: ['Information Security Policy', 'Data Protection Policy', 'Access Control Policy'],
        procedures: ['Incident Response Procedure', 'Change Management Procedure', 'Risk Assessment Procedure'],
        forms: ['Risk Assessment Form', 'Incident Report Form', 'Change Request Form'],
        tenantId: equityBank.id,
      },
    }),
    prisma.complianceFramework.upsert({
      where: { id: 'framework-pci-dss' },
      update: {},
      create: {
        id: 'framework-pci-dss',
        name: 'PCI DSS 4.0',
        version: '4.0',
        type: 'INTERNATIONAL',
        regulator: 'PCI SSC',
        status: 'IN_PROGRESS',
        currentScore: 75,
        targetScore: 100,
        gapCount: 25,
        riskCount: 15,
        totalRequirements: 78,
        implementedRequirements: 58,
        pendingRequirements: 20,
        policyDocuments: ['Card Data Handling Policy', 'Network Security Policy'],
        procedures: ['Card Data Processing Procedure', 'Network Monitoring Procedure'],
        forms: ['Card Data Access Request', 'Network Change Request'],
        tenantId: equityBank.id,
      },
    }),
    prisma.complianceFramework.upsert({
      where: { id: 'framework-cbk-guidelines' },
      update: {},
      create: {
        id: 'framework-cbk-guidelines',
        name: 'CBK Cybersecurity Guidelines',
        version: '2024',
        type: 'LOCAL',
        regulator: 'Central Bank of Kenya',
        status: 'IN_PROGRESS',
        currentScore: 80,
        targetScore: 100,
        gapCount: 20,
        riskCount: 12,
        totalRequirements: 45,
        implementedRequirements: 36,
        pendingRequirements: 9,
        policyDocuments: ['CBK Compliance Policy', 'Regulatory Reporting Policy'],
        procedures: ['CBK Reporting Procedure', 'Regulatory Compliance Procedure'],
        forms: ['CBK Compliance Report', 'Regulatory Finding Report'],
        tenantId: equityBank.id,
      },
    }),
  ]);

  console.log(`📋 Created ${complianceFrameworks.length} compliance frameworks`);

  // ========================================
  // CREATE USERS FOR EQUITY BANK
  // ========================================

  const equityUsers = await Promise.all([
    prisma.user.upsert({
      where: { id: 'user-equity-admin' },
      update: {},
      create: {
        id: 'user-equity-admin',
        email: 'admin@equitybank.co.ke',
        password: '$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu/1m', // password123
        firstName: 'John',
        lastName: 'Mwangi',
        phone: '+254 700 000001',
        employeeId: 'EMP001',
        role: 'TENANT_ADMIN',
        department: 'Information Technology',
        branchId: 'branch-equity-nbi-main',
        mfaEnabled: true,
        trainingCompleted: true,
        lastTrainingDate: new Date('2024-01-15'),
        complianceCertifications: ['ISO27001', 'PCI-DSS', 'CBK'],
        tenantId: equityBank.id,
      },
    }),
    prisma.user.upsert({
      where: { id: 'user-equity-compliance' },
      update: {},
      create: {
        id: 'user-equity-compliance',
        email: 'compliance@equitybank.co.ke',
        password: '$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu/1m', // password123
        firstName: 'Jane',
        lastName: 'Wanjiku',
        phone: '+254 700 000002',
        employeeId: 'EMP002',
        role: 'COMPLIANCE_OFFICER',
        department: 'Compliance & Risk',
        branchId: 'branch-equity-nbi-main',
        mfaEnabled: true,
        trainingCompleted: true,
        lastTrainingDate: new Date('2024-01-20'),
        complianceCertifications: ['ISO27001', 'CBK'],
        tenantId: equityBank.id,
      },
    }),
    prisma.user.upsert({
      where: { id: 'user-equity-risk' },
      update: {},
      create: {
        id: 'user-equity-risk',
        email: 'risk@equitybank.co.ke',
        password: '$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu/1m', // password123
        firstName: 'David',
        lastName: 'Kiprop',
        phone: '+254 700 000003',
        employeeId: 'EMP003',
        role: 'RISK_MANAGER',
        department: 'Risk Management',
        branchId: 'branch-equity-nbi-main',
        mfaEnabled: true,
        trainingCompleted: true,
        lastTrainingDate: new Date('2024-01-25'),
        complianceCertifications: ['ISO27001', 'CBK'],
        tenantId: equityBank.id,
      },
    }),
    prisma.user.upsert({
      where: { id: 'user-equity-auditor' },
      update: {},
      create: {
        id: 'user-equity-auditor',
        email: 'audit@equitybank.co.ke',
        password: '$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu/1m', // password123
        firstName: 'Sarah',
        lastName: 'Ochieng',
        phone: '+254 700 000004',
        employeeId: 'EMP004',
        role: 'AUDITOR',
        department: 'Internal Audit',
        branchId: 'branch-equity-nbi-main',
        mfaEnabled: true,
        trainingCompleted: true,
        lastTrainingDate: new Date('2024-01-30'),
        complianceCertifications: ['ISO27001', 'CBK'],
        tenantId: equityBank.id,
      },
    }),
  ]);

  console.log(`👥 Created ${equityUsers.length} users for ${equityBank.name}`);

  // ========================================
  // CREATE SAMPLE RISKS
  // ========================================

  const risks = await Promise.all([
    prisma.risk.upsert({
      where: { id: 'risk-cybersecurity' },
      update: {},
      create: {
        id: 'risk-cybersecurity',
        title: 'Cybersecurity Threats and Data Breaches',
        description: 'Risk of unauthorized access to customer data, financial systems, and banking infrastructure through cyber attacks, phishing, malware, or insider threats.',
        category: 'TECHNOLOGY',
        subcategory: 'Cybersecurity',
        likelihood: 'HIGH',
        impact: 'CRITICAL',
        inherentRiskScore: 20, // 5 * 4
        status: 'IDENTIFIED',
        mitigationStrategy: 'Implement multi-layered security controls, regular penetration testing, employee security training, and 24/7 security monitoring.',
        regulatoryImpact: true,
        customerImpact: true,
        financialImpact: 1000000000, // 1B KES potential loss
        ownerId: 'user-equity-risk',
        linkedFrameworks: ['ISO27001', 'PCI-DSS', 'CBK'],
        identifiedDate: new Date('2024-01-15'),
        targetMitigationDate: new Date('2024-06-30'),
        tenantId: equityBank.id,
      },
    }),
    prisma.risk.upsert({
      where: { id: 'risk-compliance' },
      update: {},
      create: {
        id: 'risk-compliance',
        title: 'Regulatory Compliance Violations',
        description: 'Risk of non-compliance with CBK regulations, data protection laws, anti-money laundering requirements, and international banking standards.',
        category: 'COMPLIANCE',
        subcategory: 'Regulatory Compliance',
        likelihood: 'MEDIUM',
        impact: 'HIGH',
        inherentRiskScore: 15, // 3 * 5
        status: 'ASSESSED',
        mitigationStrategy: 'Establish robust compliance monitoring, regular regulatory updates, compliance training programs, and automated compliance reporting.',
        regulatoryImpact: true,
        customerImpact: false,
        financialImpact: 500000000, // 500M KES potential fines
        ownerId: 'user-equity-compliance',
        linkedFrameworks: ['CBK', 'ISO27001'],
        identifiedDate: new Date('2024-01-20'),
        targetMitigationDate: new Date('2024-08-31'),
        tenantId: equityBank.id,
      },
    }),
    prisma.risk.upsert({
      where: { id: 'risk-operational' },
      update: {},
      create: {
        id: 'risk-operational',
        title: 'Operational Disruptions and System Failures',
        description: 'Risk of banking system outages, transaction processing failures, ATM network issues, and mobile banking platform disruptions.',
        category: 'OPERATIONAL',
        subcategory: 'System Availability',
        likelihood: 'MEDIUM',
        impact: 'HIGH',
        inherentRiskScore: 15, // 3 * 5
        status: 'MONITORED',
        mitigationStrategy: 'Implement redundant systems, disaster recovery plans, business continuity procedures, and regular system maintenance.',
        regulatoryImpact: false,
        customerImpact: true,
        financialImpact: 300000000, // 300M KES potential loss
        ownerId: 'user-equity-admin',
        linkedFrameworks: ['ISO27001', 'CBK'],
        identifiedDate: new Date('2024-01-25'),
        targetMitigationDate: new Date('2024-09-30'),
        tenantId: equityBank.id,
      },
    }),
  ]);

  console.log(`⚠️  Created ${risks.length} sample risks`);

  // ========================================
  // CREATE SAMPLE ACTIONS
  // ========================================

  const actions = await Promise.all([
    prisma.action.upsert({
      where: { id: 'action-mfa-implementation' },
      update: {},
      create: {
        id: 'action-mfa-implementation',
        title: 'Implement Multi-Factor Authentication (MFA)',
        description: 'Deploy MFA across all critical banking systems, mobile apps, and employee access points to enhance security.',
        type: 'REMEDIATION',
        priority: 'CRITICAL',
        regulatoryDeadline: new Date('2024-06-30'),
        complianceImpact: true,
        status: 'IN_PROGRESS',
        progress: 65,
        assigneeId: 'user-equity-admin',
        startDate: new Date('2024-01-01'),
        dueDate: new Date('2024-06-30'),
        estimatedHours: 480,
        actualHours: 312,
        budget: 5000000, // 5M KES
        linkedRisks: ['risk-cybersecurity'],
        evidenceRequired: true,
        notes: 'MFA implementation is progressing well. Core banking systems completed, mobile apps in progress.',
        updates: ['Phase 1 completed - Core banking systems', 'Phase 2 in progress - Mobile applications', 'Phase 3 planned - Employee systems'],
        tenantId: equityBank.id,
      },
    }),
    prisma.action.upsert({
      where: { id: 'action-security-training' },
      update: {},
      create: {
        id: 'action-security-training',
        title: 'Conduct Comprehensive Security Awareness Training',
        description: 'Train all employees on cybersecurity best practices, phishing prevention, and data protection requirements.',
        type: 'PREVENTIVE',
        priority: 'HIGH',
        complianceImpact: true,
        status: 'PLANNED',
        progress: 25,
        assigneeId: 'user-equity-compliance',
        startDate: new Date('2024-03-01'),
        dueDate: new Date('2024-04-30'),
        estimatedHours: 200,
        actualHours: 50,
        budget: 2000000, // 2M KES
        linkedRisks: ['risk-cybersecurity', 'risk-compliance'],
        evidenceRequired: true,
        notes: 'Training materials prepared. Schedule coordination with HR department.',
        updates: ['Training materials developed', 'Schedule coordination in progress', 'Pilot training completed'],
        tenantId: equityBank.id,
      },
    }),
    prisma.action.upsert({
      where: { id: 'action-incident-response' },
      update: {},
      create: {
        id: 'action-incident-response',
        title: 'Update Incident Response Plan and Procedures',
        description: 'Review and enhance incident response procedures, establish response teams, and conduct incident response drills.',
        type: 'IMPROVEMENT',
        priority: 'HIGH',
        complianceImpact: true,
        status: 'COMPLETED',
        progress: 100,
        assigneeId: 'user-equity-risk',
        startDate: new Date('2024-01-01'),
        dueDate: new Date('2024-02-28'),
        completedDate: new Date('2024-02-25'),
        estimatedHours: 160,
        actualHours: 155,
        budget: 1500000, // 1.5M KES
        linkedRisks: ['risk-cybersecurity', 'risk-operational'],
        evidenceRequired: true,
        notes: 'Incident response plan updated and tested. Team training completed successfully.',
        updates: ['Plan updated', 'Team training completed', 'Drill conducted successfully'],
        tenantId: equityBank.id,
      },
    }),
  ]);

  console.log(`✅ Created ${actions.length} sample actions`);

  // ========================================
  // CREATE SAMPLE EVIDENCE
  // ========================================

  const evidence = await Promise.all([
    prisma.evidence.upsert({
      where: { id: 'evidence-mfa-report' },
      update: {},
      create: {
        id: 'evidence-mfa-report',
        filename: 'MFA_Implementation_Report_Q1_2024.pdf',
        fileType: 'PDF',
        fileSize: 2048576, // 2MB
        filePath: '/evidence/mfa-implementation-report.pdf',
        title: 'Multi-Factor Authentication Implementation Report',
        description: 'Comprehensive report documenting MFA implementation across core banking systems',
        tags: ['MFA', 'Cybersecurity', 'Implementation', 'Q1-2024'],
        linkedRequirement: 'ISO27001-A.9.1',
        linkedRisk: 'risk-cybersecurity',
        linkedAction: 'action-mfa-implementation',
        uploadedBy: 'user-equity-admin',
        uploadedAt: new Date('2024-03-15'),
        verifiedBy: 'user-equity-compliance',
        verifiedAt: new Date('2024-03-20'),
        verificationNotes: 'Report verified and approved by compliance team',
        isPublic: false,
        accessLevel: 'RESTRICTED',
        tenantId: equityBank.id,
      },
    }),
    prisma.evidence.upsert({
      where: { id: 'evidence-training-certificates' },
      update: {},
      create: {
        id: 'evidence-training-certificates',
        filename: 'Security_Training_Certificates_Batch1.zip',
        fileType: 'ZIP',
        fileSize: 10485760, // 10MB
        filePath: '/evidence/security-training-certificates.zip',
        title: 'Security Awareness Training Certificates',
        description: 'Certificates for employees who completed cybersecurity training',
        tags: ['Training', 'Certificates', 'Cybersecurity', 'Compliance'],
        linkedRequirement: 'ISO27001-A.7.1',
        linkedRisk: 'risk-cybersecurity',
        linkedAction: 'action-security-training',
        uploadedBy: 'user-equity-compliance',
        uploadedAt: new Date('2024-03-20'),
        verifiedBy: 'user-equity-risk',
        verifiedAt: new Date('2024-03-22'),
        verificationNotes: 'Training certificates verified. All required employees completed training.',
        isPublic: false,
        accessLevel: 'RESTRICTED',
        tenantId: equityBank.id,
      },
    }),
  ]);

  console.log(`📁 Created ${evidence.length} sample evidence items`);

  // ========================================
  // CREATE SAMPLE ASSESSMENT
  // ========================================

  const assessment = await prisma.assessment.upsert({
    where: { id: 'assessment-iso27001-2024' },
    update: {},
    create: {
      id: 'assessment-iso27001-2024',
      title: 'ISO 27001:2022 Compliance Assessment Q1 2024',
      description: 'Quarterly assessment of ISO 27001:2022 compliance status and gap analysis',
      framework: 'ISO27001',
      scope: 'All information security controls and processes',
      methodology: 'Internal audit with external consultant review',
      totalScore: 100,
      achievedScore: 87,
      gapScore: 13,
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-03-31'),
      nextAssessmentDate: new Date('2024-06-30'),
      status: 'COMPLETED',
      assessor: 'user-equity-auditor',
      participants: ['user-equity-admin', 'user-equity-compliance', 'user-equity-risk'],
      findings: [
        'MFA implementation needs completion across all systems',
        'Security awareness training requires enhancement',
        'Incident response procedures need regular testing'
      ],
      recommendations: [
        'Complete MFA rollout by Q2 2024',
        'Implement quarterly security training',
        'Conduct monthly incident response drills'
      ],
      tenantId: equityBank.id,
    },
  });

  console.log(`📊 Created compliance assessment`);

  // ========================================
  // SUMMARY
  // ========================================

  console.log('\n🎯 Banking-Grade Platform Ready!');
  console.log('=====================================');
  console.log(`🏦 Tenants Created: 5 (Major Kenyan Financial Institutions)`);
  console.log(`🏢 Branches Created: ${equityBranches.length} (Equity Bank)`);
  console.log(`👥 Users Created: ${equityUsers.length} (Equity Bank)`);
  console.log(`📋 Compliance Frameworks: ${complianceFrameworks.length}`);
  console.log(`⚠️  Risks Identified: ${risks.length}`);
  console.log(`✅ Actions Planned: ${actions.length}`);
  console.log(`📁 Evidence Items: ${evidence.length}`);
  console.log(`📊 Assessments: 1`);

  console.log('\n🔑 Test Credentials for Equity Bank:');
  console.log('   👨‍💼 Admin: admin@equitybank.co.ke / password123');
  console.log('   👩‍⚖️  Compliance: compliance@equitybank.co.ke / password123');
  console.log('   👨‍💼 Risk Manager: risk@equitybank.co.ke / password123');
  console.log('   👩‍💼 Auditor: audit@equitybank.co.ke / password123');

  console.log('\n🔑 Set localStorage.tenantId to test different tenants:');
  console.log('   - equity-bank-ke (Full data)');
  console.log('   - kcb-bank-ke (Basic structure)');
  console.log('   - safaricom-mpesa (Basic structure)');
  console.log('   - co-op-bank-ke (Basic structure)');
  console.log('   - absa-bank-ke (Basic structure)');

  console.log('\n🚀 This platform is now ready to onboard Kenyan banks!');
  console.log('   Features: Banking-grade security, CBK compliance, ISO standards');
  console.log('   Scalability: Multi-tenant architecture for unlimited banks');
  console.log('   Compliance: Automated reporting, audit trails, risk management');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log('\n✅ Banking-Grade Seeding Completed Successfully!');
  });
