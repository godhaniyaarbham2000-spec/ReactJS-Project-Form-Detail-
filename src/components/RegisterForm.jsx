import React, { useState, useEffect } from "react";

const initial = {
  fullName: "",
  email: "",
  password: "",
  city: "",
  phone: ""
};

function validate(values) {
  const errors = {};
  if (!values.fullName.trim()) errors.fullName = "Full name is required";
  if (!values.email) errors.email = "Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = "Invalid email";
  if (!values.password) errors.password = "Password is required";
  else if (values.password.length < 8) errors.password = "Password must be at least 8 characters";
  if (!values.city) errors.city = "City is required";
  if (!values.phone) errors.phone = "Phone number is required";
  else if (!/^[0-9]{10}$/.test(values.phone)) errors.phone = "Phone must be 10 digits";
  return errors;
}

export default function RegisterForm() {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(null);

  useEffect(() => {
    setErrors(validate(values));
  }, [values]);

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((s) => ({ ...s, [name]: value }));
  }

  function handleBlur(e) {
    const { name } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setTouched({
      fullName: true,
      email: true,
      password: true,
      city: true,
      phone: true
    });
    const currentErrors = validate(values);
    setErrors(currentErrors);
    if (Object.keys(currentErrors).length) return;
    setIsSubmitting(true);
    try {
      await new Promise((r) => setTimeout(r, 800));
      setSubmitted({
        status: "success",
        data: { ...values }
      });
      setValues(initial);
      setTouched({});
    } catch {
      setSubmitted({ status: "error" });
    } finally {
      setIsSubmitting(false);
    }
  }

  const isValid = Object.keys(errors).length === 0;

  return (
    <form onSubmit={handleSubmit} noValidate className="form">
      <div className="field">
        <label htmlFor="fullName">Full Name</label>
        <input
          id="fullName"
          name="fullName"
          value={values.fullName}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          autoComplete="name"
        />
        {touched.fullName && errors.fullName && <div className="error">{errors.fullName}</div>}
      </div>

      <div className="field">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          autoComplete="email"
        />
        {touched.email && errors.email && <div className="error">{errors.email}</div>}
      </div>

      <div className="field">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          autoComplete="new-password"
        />
        {touched.password && errors.password && <div className="error">{errors.password}</div>}
      </div>

      <div className="field">
        <label htmlFor="city">City</label>
        <select
          id="city"
          name="city"
          value={values.city}
          onChange={handleChange}
          onBlur={handleBlur}
          required
        >
          <option value="">Select city</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Delhi">Delhi</option>
          <option value="Bengaluru">Bengaluru</option>
          <option value="Other">Other</option>
        </select>
        {touched.city && errors.city && <div className="error">{errors.city}</div>}
      </div>

      <div className="field">
        <label htmlFor="phone">Phone Number</label>
        <input
          id="phone"
          name="phone"
          type="tel"
          value={values.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          inputMode="numeric"
        />
        {touched.phone && errors.phone && <div className="error">{errors.phone}</div>}
      </div>

      <div className="actions">
        <button type="submit" disabled={isSubmitting || !isValid} className="btn">
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </div>

      {submitted && submitted.status === "success" && (
        <div className="success">
          Registration successful
          <pre className="payload">{JSON.stringify(submitted.data, null, 2)}</pre>
        </div>
      )}

      {submitted && submitted.status === "error" && <div className="error">Submission failed</div>}
    </form>
  );
}
