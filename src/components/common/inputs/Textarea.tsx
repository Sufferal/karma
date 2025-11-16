export const Textarea = ({ label, id, ...props }) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="mb-2 font-semibold text-slate-600">
        {label}
      </label>
      <textarea
        id={id}
        {...props}
        className="resize-none px-2 py-1 rounded-md border-2 border-slate-300 text-slate-900 transition outline-0 whitespace-pre-wrap focus:border-slate-900"
      />
    </div>
  );
};
