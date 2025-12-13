import { Controller, useFormContext } from "react-hook-form";


interface TextareaProps {
  inputName: string;
  control: any;
  rules?: Record<string, any>;
  placeholder?: string;
  className?: string;
}

const Textarea = (
  {
    inputName,
    control,
    rules,
    placeholder,
    className,
  }: TextareaProps) => {

  const { formState: { errors } } = useFormContext();

  return (
    <Controller
      name={inputName}
      control={control}
      rules={rules}
      render={({ field }) => (
        <>
          <textarea
            {...field}
            placeholder={placeholder}
            className={`border border-gray-200 rounded-lg p-4 w-full resize-none overflow-y-auto text-start ${className}`}
            style={{ whiteSpace: "pre-wrap" }}
          />
          {errors?.[inputName] && (
            <p className="text-red-500 text-sm mt-1 mb-2">{errors[inputName]?.message as string}</p>
          )}
        </>
      )}
    />
  );
};
export default Textarea;
