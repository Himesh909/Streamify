import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { LANGUAGES } from "../../constants";
const Input = ({
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
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="form-control w-full">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>

      {isPassword ? (
        <>
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
              onClick={() => setShowPassword(!showPassword)}
            >
              {!showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <p className="text-xs opacity-70 mt-1">
            Password must be at least 6 characters long.
          </p>
        </>
      ) : isTextarea ? (
        <>
          <textarea
            placeholder={placeholder}
            className="textarea textarea-bordered w-full"
            value={value}
            onChange={onChange}
            required={required}
            rows={rows}
            name={name}
            {...props}
          ></textarea>
          {helpText && <p className="text-xs opacity-70 mt-1">{helpText}</p>}
        </>
      ) : isSelect ? (
        <>
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
          {helpText && <p className="text-xs opacity-70 mt-1">{helpText}</p>}
        </>
      ) : (
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
          {helpText && <p className="text-xs opacity-70 mt-1">{helpText}</p>}
        </div>
      )}
    </div>
  );
};

export default Input;
