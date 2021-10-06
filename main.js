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
      errors: [],
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
        if (!this.validEmail(this.emailAddress)) {
          this.errors.push("Valid Email Address is required");
        }
        if (!this.validPhoneNumber(this.phoneNumber)) {
          this.errors.push(
            "Valid Phone Number is required and should not be less than 11 digits"
          );
        }
        if (!this.validMessage(this.message)) {
          this.errors.push("Your intro should not exceed 200 characters");
        }
        if (
          this.validEmail(this.emailAddress) &&
          this.validMessage(this.message) &&
          this.validPhoneNumber(this.phoneNumber)
        ) {
          this.errors = [];
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
    validEmail(email) {
      var re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    validPhoneNumber(phoneNo) {
      var reg = /^[0-9]*$/;
      if (reg.test(parseInt(phoneNo, 10)) && phoneNo.length < 11) {
        return false;
      } else if (reg.test(parseInt(phoneNo, 10)) && phoneNo.length === 11) {
        return true;
      }
    },
    validMessage(userMessage) {
      if (userMessage.length > 200) {
        return false;
      }
      return true;
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
