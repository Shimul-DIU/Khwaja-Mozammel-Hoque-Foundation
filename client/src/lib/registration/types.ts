
export type FormState = {
 
  purpose: string;
  region: string;
  designation: string;
  name: string;
  fatherName: string;
  spouseName: string;
  country: string;
  division: string;
  district: string;
  ps: string;
  union: string;
  po: string;
  postCode: string;
  village: string;
  street: string;
  dob: string[];
  religion: string;
  bloodGroup: string;
  profession: string;
  nationality: string;
  email: string;
  password: string;
  contactNo: string;
  idType: "NID" | "BRN" | "PPN" | "";
  idNumber: string[];
  gender: "male" | "female" | "";
  maritalStatus: "married" | "unmarried" | "";
  sonCount: string;
  daughterCount: string;
  widow: boolean;
  widower: boolean;
  divorced: boolean;
  passedAway: boolean;
  securityVolunteer: boolean;
  education:
  | "underSSC"
  | "SSC"
  | "HSC"
  | "bachelors"
  | "masters"
  | "doctorate"
  | "";
  followerMozammel: boolean;
  followerYunus: boolean;
  otherNesbot: boolean;
  otherNesbotDetail: string;
  joiningDate: string;
  joinSadka: boolean;
  khademName: string;
  coordinatorName: string;
};

export const emptyState: FormState = {

  purpose: "",
  region: "",
  designation: "",
  name: "",
  fatherName: "",
  spouseName: "",
  country: "বাংলাদেশ",
  division: "",
  district: "",
  ps: "",
  union: "",
  po: "",
  postCode: "",
  village: "",
  street: "",
  dob: Array(8).fill(""),
  religion: "",
  bloodGroup: "",
  profession: "",
  nationality: "বাংলাদেশি",
  email: "",
  contactNo: "",
  idType: "",
  idNumber: Array(17).fill(""),
  gender: "",
  maritalStatus: "",
  sonCount: "",
  password: "",
  daughterCount: "",
  widow: false,

  widower: false,
  divorced: false,
  passedAway: false,
  securityVolunteer: false,
  education: "",
  followerMozammel: false,
  followerYunus: false,
  otherNesbot: false,
  otherNesbotDetail: "",
  joiningDate: "",
  joinSadka: false,
  khademName: "",
  coordinatorName: "",
};


export function toEn(reverseMap: Record<string, string>, bn: string): string {
  return reverseMap[bn] ?? bn;
}
