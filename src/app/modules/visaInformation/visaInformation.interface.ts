export type TStudentVisaService = {
  visaConsultancy: boolean;
  servicesProvided: string[];
};

export type TStudentVisaProcessingManual = {
  introduction: string;
  steps: {
    chooseVisaCategory: string;
    organizeDocuments: string;
    createImmiAccount: string;
    fillApplicationForm: string;
    uploadDocuments: string;
    submitApplication: string;
    payVisaFees: string;
    scheduleBiometrics: string;
    visaDecision: string;
  };
  conclusion: string;
};

export type TStudentVisaAvailability = {
  stickerVisa: string | null;
  stampVisa: string | null;
  eVisa: string;
  visaExemption: string | null;
  onArrival: string | null;
};

export type TStudentFileSubmissionMethod = {
  inPersonSubmission: boolean;
  authorizedPerson: boolean;
  submissionThroughCourier: boolean;
  submissionInEmbassy: boolean;
  submissionInPortal: boolean;
  biometricMandatory: boolean;
};

export type TStudentHighCommission = {
  address: string;
  phone: string[];
  fax: string;
  email: string[];
  web: string;
  officeHours: string;
};

export type TStudentVFS = {
  address: string;
  helpline: string;
  email: string;
  web: string;
  applicationSubmitTiming: string;
  additionalDocumentSubmissionTiming: string;
};

export type TStudentVisaInfomation = {
  description: string;
  website: string;
};

export type TStudentVisaInfo = {
  visaService: TStudentVisaService;
  processingManual: TStudentVisaProcessingManual;
  visaAvailability: TStudentVisaAvailability;
  fileSubmissionMethod: TStudentFileSubmissionMethod;
  highCommission: TStudentHighCommission;
  vfs: TStudentVFS;
  studentVisa: TStudentVisaInfomation;
};

export type TBusinessVisaEmbassy = {
  address: string;
  phone: string;
  email: string[];
  officeHours: string;
  fex: string;
};
export type TBusinessVisaRequirements = {
  passport: string;
  visaApplicationForm: string;
  photograph: string;
  coverLetter: string;
  invitationLetter: string;
  forwardingLetter: string;
  officeIdCard: string;
  incorporationCertificate: string;
  companyMemorandum: string;
  personalBankStatements: string;
  personalITRCertificate: string;
  companyBankStatements: string;
  companyITRCertificate: string;
  airlineTicketItinerary: string;
  hotelReservation: string;
};

export type TBusinessVisaInfo = {
  embassy: TBusinessVisaEmbassy;
  importantInformation: TBusinessVisaRequirements;
};

export type TvisaType =
  | "Student Visa"
  | "Tourist Visa"
  | "Family Visa"
  | "Business Visa";

export type VisaInfo = {
  visaType: TvisaType;
  country: string;
  studentVisa?: TStudentVisaInfo;
  businessVisa?: TBusinessVisaInfo;
};
