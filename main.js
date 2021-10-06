var eventBus = new Vue();

Vue.component("user-details-form", {
  template: "#user-details-form-template",
  data() {
    return {
      firstName: null,
      lastName: null,
      phoneNumber: null,
      emailAddress: null,
      message: null,
      errors: {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        emailAddress: '',
        message: '',
      },
    };
  },
  methods: {
    onUserDetailsSubmit() {
      if (
        this.firstName &&
        this.lastName &&
        this.phoneNumber &&
        this.emailAddress &&
        this.message
      ) {
        if (!this.errors.firstName && !this.errors.lastName && !this.errors.phoneNumber && !this.errors.emailAddress && !this.errors.message) {
          let userInfo = {
            firstName: this.firstName,
            lastName: this.lastName,
            phoneNumber: this.phoneNumber,
            emailAddress: this.emailAddress,
            message: this.message,
          };
          eventBus.$emit("user-details-submitted", userInfo);
          this.firstName = "";
          this.lastName = "";
          this.phoneNumber = "";
          this.emailAddress = "";
          this.message = "";
        }
      }
    },
    validFirstName(fName) {
      var reg = /^[A-Za-z]+$/;
      if (!reg.test(fName)) {
        this.errors.firstName = "First name should be alphabets"
      } else {
        this.errors.firstName = "";
      }
    },
    validLastName(lName) {
      var reg = /^[A-Za-z]+$/;
      if (!reg.test(lName)) {
        this.errors.lastName = "Last name should be alphabets"
      } else {
        this.errors.lastName = "";
      }
    },
    validEmail(email) {
      var re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!re.test(email)) {
        this.errors.emailAddress = "Valid Email Address is required"
      } else {
        this.errors.emailAddress = "";
      };
    },
    validPhoneNumber(phoneNo) {
      var reg = /^[0-9]*$/;
      if (reg.test(parseInt(phoneNo, 10)) && phoneNo.length < 11) {
        this.errors.phoneNumber = "Phone number must be 11 digits"
      } else if (!reg.test(parseInt(phoneNo, 10))) {
        this.errors.phoneNumber = "Phone number must be digits"
      } else {
        this.errors.phoneNumber = "";
      }
    },
    validMessage(userMessage) {
      if (userMessage.length > 200) {
        this.errors.message = "Intro should not exceed 200 characters"
      } else {
        this.errors.message = "";
      }
    },
  },
  computed: {
    isDisabled() {
      return (
        !this.firstName ||
        !this.lastName ||
        !this.phoneNumber ||
        !this.emailAddress ||
        !this.message
      );
    },
    messageCount() {
      return this.message ? this.message.length : 0;
    },
  },
});

Vue.component("user-details-table", {
  template: "#user-details-table-template",
  data() {
    return {
      users: [],
    };
  },
  mounted() {
    eventBus.$on("user-details-submitted", (userInfo) => {
      this.users.push(userInfo);
    });
  },
});

var app = new Vue({
  el: "#app",
});
