// main function
function Validator(option) {
	function getParent(element, selector) {
		while (element.parentElement) {
			if (element.parentElement.matches(selector)) {
				return element.parentElement
			} else {
				element = element.parentElement
			}
		}
	}

	var selectorRules = {}

	// sub
	function validate(inputElement, rule) {
		var errorMessage

		var messageElement = getParent(inputElement, option.formGroupSelector).querySelector(option.messageElement)

		let rules = selectorRules[rule.selector]

		for (let i = 0; i < rules.length; i++) {

			switch (inputElement.type) {

				case "radio":
				case "checkbox":
					errorMessage = rules[i](formElement.querySelector(rule.selector + ":checked"))

					break;

				default:
					errorMessage = rules[i](inputElement.value)
			}

			if (errorMessage) break;
		}
		if (errorMessage) {
			messageElement.innerText = errorMessage
			getParent(inputElement, option.formGroupSelector).classList.add(option.errorClass)
		} else {
			messageElement.innerText = ""
			getParent(inputElement, option.formGroupSelector).classList.remove(option.errorClass)
		}

		return !errorMessage
	}

	//Start

	var formElement = document.querySelector(option.form)
	if (formElement) {

		//submit
		formElement.onsubmit = function (e) {
			e.preventDefault()

			var isFormValid = true

			//loop rules and validate
			option.rules.forEach(function (rule) {
				var inputElement = formElement.querySelector(rule.selector)
				var isValid = validate(inputElement, rule)
				if (!isValid) {
					isFormValid = false
				}

			})
			if (isFormValid) {
				if (typeof option.onSubmit === "function") {
					var enableInputs = formElement.querySelectorAll("[name]")
					var formValues = Array.from(enableInputs).reduce(function (values, input) {
						switch (input.type) {
							case 'radio':
								values[input.name] = formElement.querySelector('input[name="' + input.name + '"]:checked').value;
								break;
							case 'checkbox':
								if (!input.matches(':checked')) {
									values[input.name] = '';
									return values;
								}
								if (!Array.isArray(values[input.name])) {
									values[input.name] = [];
								}
								values[input.name].push(input.value);
								break;
							case 'file':
								values[input.name] = input.files;
								break;
							default:
								values[input.name] = input.value;
						}

						return values;
					}, {});

					option.onSubmit(formValues)
				}
				else {
					formElement.submit();
				}

			}
		}


		//handling
		option.rules.forEach(function (rule) {

			if (Array.isArray(selectorRules[rule.selector])) {

				selectorRules[rule.selector].push(rule.check)
			} else {
				selectorRules[rule.selector] = [rule.check]
			}

			var inputElements = formElement.querySelectorAll(rule.selector)

			Array.from(inputElements).forEach((inputElement) => {
				//blur
				inputElement.onblur = function () {
					validate(inputElement, rule)
				}

				inputElement.oninput = function () {
					var messageElement = getParent(inputElement, option.formGroupSelector).querySelector(option.messageElement)
					messageElement.innerText = ""
					getParent(inputElement, option.formGroupSelector).classList.remove(option.errorClass)
				}

			})

		})
	}

}

//check function
//1. error => return message error
//2. success => return null
Validator.isRequired = function (selector, message) {
	return {
		selector: selector,
		check: function (value) {
			return value.trim() ? undefined : message
		}
	}

}

Validator.isEmail = function (selector, message) {
	return {
		selector: selector,
		check: function (value) {
			let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
			return regexEmail.test(value) ? undefined : message
		}
	}
}

Validator.isPassWord = function (selector, message) {
	return {
		selector: selector,
		check: function (value) {
			let regexPassWord = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
			return regexPassWord.test(value) ? undefined : message
		}
	}
}


Validator.isSamePass = function (selector, getCofirmValue, messageLength, message) {
	return {
		selector: selector,
		check: function (value) {
			let regexPassWord = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
			return regexPassWord.test(value) && getCofirmValue() == value ? undefined : value.length <= 8 ? messageLength : message


		}
	}
}



