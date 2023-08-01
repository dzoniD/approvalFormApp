export const validation = {
    passwordValidationRequirements: {
      required: {
        value: true,
        message: 'Polje je obavezno',
      },
      minLength: {
        value: 10,
        message: 'Šifra mora da ima najmanje 8 karaktera! ',
      },
      pattern: {
        value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
        message:
          'Šifra mora da sadrži najmanje jedno malo slovo, najmanje jedno veliko slovo, najmanje jedan broj.',
      },
    },
  
    emailValidationRequirements: {
      pattern: {
        value:
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])|(([a-zA-Z\-\d]+\.)+[a-zA-Z]{2,}))$/,
        message: 'Format mejla je neispravan',
      },
      required: {
        value: true,
        message: 'Polje je obavezno.',
      },
    },
  
    textValidationRequirements: {
      pattern: {
        value: /^[a-zA-Z,\u0161\u0111\u010D\u0107\u017E\u0430\u044f{=} \-.]+$/,
        message: 'Polje sadrži nedozvoljene karaktere.',
      },
      required: {
        value: true,
        message: 'Polje je obavezno.',
      },
    },
  
    checkBoxValidationRequirements: {
      required: {
        value: true,
        message: 'Polje je obavezno.',
      },
    },
  };