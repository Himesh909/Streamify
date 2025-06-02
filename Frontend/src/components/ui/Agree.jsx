const Agree = ({ isButtonDisabled, setIsButtonDisabled }) => {
  return (
    <div className="form-control">
      <div className="flex items-center gap-2">
        <label className="label cursor-pointer justify-start gap-2">
          <input
            type="checkbox"
            className="checkbox checkbox-sm"
            required
            onClick={() => setIsButtonDisabled(!isButtonDisabled)}
          />
        </label>
        <span className="text-xs leading-tight">
          I agree to the{" "}
          <span className="text-primary hover:underline hover:cursor-pointer">
            terms of service
          </span>{" "}
          and{" "}
          <span className="text-primary hover:underline hover:cursor-pointer">
            privacy policy
          </span>
        </span>
      </div>
    </div>
  );
};

export default Agree;
