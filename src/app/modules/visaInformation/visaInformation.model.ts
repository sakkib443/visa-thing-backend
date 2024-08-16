import { Schema, model, Document } from "mongoose";
import { TVisaInfo } from "./visaInformation.interface";

// 1. Student Visa Service
const studentVisaServiceSchema = new Schema({
  visaConsultancy: { type: Boolean, required: true },
  servicesProvided: { type: [String], required: true },
});

// 2. Student Visa Processing Manual
const studentVisaProcessingManualSchema = new Schema({
  introduction: { type: String, required: true },
  steps: {
    chooseVisaCategory: { type: String, required: true },
    organizeDocuments: { type: String, required: true },
    createImmiAccount: { type: String, required: true },
    fillApplicationForm: { type: String, required: true },
    uploadDocuments: { type: String, required: true },
    submitApplication: { type: String, required: true },
    payVisaFees: { type: String, required: true },
    scheduleBiometrics: { type: String, required: true },
    visaDecision: { type: String, required: true },
  },
  conclusion: { type: String, required: true },
});

// 3. Student Visa Availability
const studentVisaAvailabilitySchema = new Schema({
  stickerVisa: { type: String, default: null },
  stampVisa: { type: String, default: null },
  eVisa: { type: String, required: true },
  visaExemption: { type: String, default: null },
  onArrival: { type: String, default: null },
});

// 4. Student File Submission Method
const studentFileSubmissionMethodSchema = new Schema({
  inPersonSubmission: { type: Boolean, required: true },
  authorizedPerson: { type: Boolean, required: true },
  submissionThroughCourier: { type: Boolean, required: true },
  submissionInEmbassy: { type: Boolean, required: true },
  submissionInPortal: { type: Boolean, required: true },
  biometricMandatory: { type: Boolean, required: true },
});

// 5. Student High Commission
const studentHighCommissionSchema = new Schema({
  address: { type: String, required: true },
  phone: { type: [String], required: true },
  fax: { type: String, required: true },
  email: { type: [String], required: true },
  web: { type: String, required: true },
  officeHours: { type: String, required: true },
});

// 6. Student VFS
const studentVFSSchema = new Schema({
  address: { type: String, required: true },
  helpline: { type: String, required: true },
  email: { type: String, required: true },
  web: { type: String, required: true },
  applicationSubmitTiming: { type: String, required: true },
  additionalDocumentSubmissionTiming: { type: String, required: true },
});

// 7. Student Visa Information
const studentVisaInformationSchema = new Schema({
  description: { type: String, required: true },
  website: { type: String, required: true },
});

// 8. Student Visa Info
const studentVisaInfoSchema = new Schema({
  visaService: { type: studentVisaServiceSchema, required: true },
  processingManual: { type: studentVisaProcessingManualSchema, required: true },
  visaAvailability: { type: studentVisaAvailabilitySchema, required: true },
  fileSubmissionMethod: {
    type: studentFileSubmissionMethodSchema,
    required: true,
  },
  highCommission: { type: studentHighCommissionSchema, required: true },
  vfs: { type: studentVFSSchema, required: true },
  studentVisa: { type: studentVisaInformationSchema, required: true },
});

// 9. Business Visa Embassy
const businessVisaEmbassySchema = new Schema({
  address: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: [String], required: true },
  officeHours: { type: String, required: true },
  fax: { type: String, required: true },
});

// 10. Business Visa Requirements
const businessVisaRequirementsSchema = new Schema({
  passport: { type: String, required: true },
  visaApplicationForm: { type: String, required: true },
  photograph: { type: String, required: true },
  coverLetter: { type: String, required: true },
  invitationLetter: { type: String, required: true },
  forwardingLetter: { type: String, required: true },
  officeIdCard: { type: String, required: true },
  incorporationCertificate: { type: String, required: true },
  companyMemorandum: { type: String, required: true },
  personalBankStatements: { type: String, required: true },
  personalITRCertificate: { type: String, required: true },
  companyBankStatements: { type: String, required: true },
  companyITRCertificate: { type: String, required: true },
  airlineTicketItinerary: { type: String, required: true },
  hotelReservation: { type: String, required: true },
});

// 11. Business Visa Info
const businessVisaInfoSchema = new Schema({
  embassy: { type: businessVisaEmbassySchema, required: true },
  importantInformation: {
    type: businessVisaRequirementsSchema,
    required: true,
  },
});

// 12. Visa Info
const visaInfoSchema = new Schema({
  visaType: {
    type: String,
    enum: ["Student Visa", "Tourist Visa", "Family Visa", "Business Visa"],
    required: true,
  },
  country: { type: String, required: true },

  studentVisa: { type: studentVisaInfoSchema },
  businessVisa: { type: businessVisaInfoSchema },
});

// Export the Mongoose model
export const VisaInfoModel = model<TVisaInfo>("VisaInfo", visaInfoSchema);
