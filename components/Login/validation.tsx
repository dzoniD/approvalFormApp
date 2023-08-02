export const validation = {
  passwordValidationRequirements: {
    required: {
      value: true,
      message: "This field is required",
    },
    minLength: {
      value: 10,
      message: "Password must contain at least 10 characters ",
    },
  },

  emailValidationRequirements: {
    pattern: {
      value:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])|(([a-zA-Z\-\d]+\.)+[a-zA-Z]{2,}))$/,
      message: "Form of the email is not correct.",
    },
    required: {
      value: true,
      message: "This field is required",
    },
  },

  textValidationRequirements: {
    pattern: {
      value: /^[a-zA-Z,\u0161\u0111\u010D\u0107\u017E\u0430\u044f{=} \-.]+$/,
      message: "Field contains unallowed characters",
    },
    required: {
      value: true,
      message: "This field is required",
    },
  },

  checkBoxValidationRequirements: {
    required: {
      value: true,
      message: "This field is required.",
    },
  },
};
