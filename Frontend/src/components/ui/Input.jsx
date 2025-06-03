import { Eye, EyeOff } from "lucide-react";
import { useState, useCallback, memo } from "react";
import { LANGUAGES } from "../../constants";

// Helper components for better code organization
const PasswordInput = memo(
  ({ placeholder, value, onChange, required, name, ...props }) => {
    const [showPassword, setShowPassword] = useState(false);
    const togglePassword = useCallback(
      () => setShowPassword((prev) => !prev),
      []
    );

    return (
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          className="input input-bordered w-full pr-12"
          value={value}
          onChange={onChange}
          required={required}
          name={name}
          {...props}
        />
        <button
          type="button"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          onClick={togglePassword}
        >
          {!showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
    );
  }
);

const TextArea = memo(
  ({ placeholder, value, onChange, required, rows, name, ...props }) => (
    <textarea
      placeholder={placeholder}
      className="textarea textarea-bordered w-full"
      value={value}
      onChange={onChange}
      required={required}
      rows={rows}
      name={name}
      {...props}
    />
  )
);

const SelectInput = memo(
  ({ value, onChange, required, name, defaultOption, options, ...props }) => (
    <select
      className="select select-bordered w-full"
      value={value}
      onChange={onChange}
      required={required}
      name={name}
      {...props}
    >
      <option value="">{defaultOption}</option>
      {LANGUAGES.map((language, index) => {
        const languageValue = language.toLowerCase();
        return (
          <option key={`${name}-${index}`} value={languageValue}>
            {language}
          </option>
        );
      })}
    </select>
  )
);

const StandardInput = memo(
  ({ type, placeholder, value, onChange, required, name, icon, ...props }) => (
    <div className={icon ? "relative" : ""}>
      {icon && (
        <span className="absolute top-1/2 transform -translate-y-1/2 left-3 text-base-content opacity-70">
          {icon}
        </span>
      )}
      <input
        type={type}
        placeholder={placeholder}
        className={`input input-bordered w-full ${icon ? "pl-10" : ""}`}
        value={value}
        onChange={onChange}
        required={required}
        name={name}
        {...props}
      />
    </div>
  )
);

const HelpText = memo(({ text }) =>
  text ? <p className="text-xs opacity-70 mt-1">{text}</p> : null
);

const Input = memo(
  ({
    label,
    type,
    placeholder,
    value,
    onChange,
    required = false,
    isPassword = false,
    isTextarea = false,
    isSelect = false,
    defaultOption = "Select an option",
    rows = 4,
    helpText,
    name,
    icon,
    ...props
  }) => {
    return (
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">{label}</span>
        </label>

        {isPassword ? (
          <>
            <PasswordInput
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              required={required}
              name={name}
              {...props}
            />
            <HelpText text="Password must be at least 6 characters long." />
          </>
        ) : isTextarea ? (
          <>
            <TextArea
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              required={required}
              rows={rows}
              name={name}
              {...props}
            />
            <HelpText text={helpText} />
          </>
        ) : isSelect ? (
          <>
            <SelectInput
              value={value}
              onChange={onChange}
              required={required}
              name={name}
              defaultOption={defaultOption}
              {...props}
            />
            <HelpText text={helpText} />
          </>
        ) : (
          <>
            <StandardInput
              type={type}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              required={required}
              name={name}
              icon={icon}
              {...props}
            />
            <HelpText text={helpText} />
          </>
        )}
      </div>
    );
  }
);

export default Input;
