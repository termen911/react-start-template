export interface ProfileFormData {
  nickname: string;
  about: string;
}

export interface ProfileFormProps {
  onSubmit?: (data: ProfileFormData) => void;
  initialData?: Partial<ProfileFormData>;
  loading?: boolean;
}
