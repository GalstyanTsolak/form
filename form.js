class Form {
	
	constructor(config) {
		this.config = config;
		this.init();
	}

	attachListeners() {
		this.form.on('submit', (e) =>{
			this.handleSubmit(e);
		});
		
	}

	init() {
		this.form = $(this.config.formId);
		this.attachListeners();
		this.validationTypes = {
			required: this.validateRequired,
			email: this.validateEmail
		}
	}
	
	addErrorMessage(elId, text) {
		this.cleanErrors(elId);
		$(elId).addClass('is-invalid');
		$(elId).after(`<div class="invalid-feedback">
				${text}
		  </div>`);
	}

	validateRequired(elId) {
		if($(elId).val() === '' && $(elId).val().length < 1) {
			this.addErrorMessage(elId, "Provide name");
		} else {
			this.cleanErrors(elId);
		}
		 
	}
	cleanErrors(elId) {
		$(elId).removeClass("is-invalid");
		$(elId).parent().find(".invalid-feedback").remove();
	}


	validateEmail(elId) {
			var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			if(!re.test($(elId).val().toLowerCase())) {
				this.addErrorMessage(elId, "Invalid email ");
			} else {
				this.cleanErrors(elId);
			}
		
	}
	
	handleSubmit(e) {
		e.preventDefault();
		let self = this;
		this.config.fields.forEach((el)=>{
			el.validation.forEach((validataionType)=> {
				this.validationTypes[validataionType].call(self, el.id);
			
			});
		});
	}
}


let configObject = {
	formId: "#regFrom",
	fields: [
		{
			id: "#name",
			validation: ['required']
		},
		{
			id: "#email",
			validation: ['required', 'email']
		}
	]
}


$(document).ready(()=>{
	let form = new Form(configObject);

});