import { useFormik } from "formik";
import { toast } from "react-hot-toast";
import {
  useCheckQuery,
  useCreateWorkExperienceMutation,
} from "../../../store/api/authApiSlice";

export default function WorkForm(props) {
  const [createWorkExperience, { isLoading, isSuccess }] =
    useCreateWorkExperienceMutation();
  const { data: user } = useCheckQuery();
  const userId = user?._id;
  const formik = useFormik({
    initialValues: {
      company: "",
      job: "",
      city: "",
      description: "",
    },
    onSubmit: async (values) => {
      await createWorkExperience({ ...values, userId }).unwrap();
      if (isSuccess) {
        toast.success("Work experience created");
      } else {
        toast.error("Work experience failed");
      }
    },
  });

  return (
    <article>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">company</span>
          </label>
          <div className="relative">
            <input
              type="text"
              className="input input-bordered w-full pl-10"
              placeholder="company"
              id="company"
              name="company"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.company}
            />
          </div>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">job</span>
          </label>
          <div className="relative">
            <input
              type="text"
              className="input input-bordered w-full pl-10"
              placeholder="job"
              id="job"
              name="job"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.job}
            />
          </div>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">city</span>
          </label>
          <div className="relative">
            <input
              type="text"
              className="input input-bordered w-full pl-10"
              placeholder="city"
              id="city"
              name="city"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.city}
            />
          </div>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">description</span>
          </label>
          <textarea
            type="text"
            className="input input-bordered w-full pl-10"
            placeholder="description"
            id="description"
            name="description"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
          ></textarea>
        </div>
        <div className="flex gap-3">
          <button
            className="btn btn-primary text-white"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
          <button
            onClick={() => props.setToggle(!props.toggle)}
            className="btn btn-accent text-white"
          >
            cancel
          </button>
        </div>
      </form>
    </article>
  );
}
