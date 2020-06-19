using FluentValidation;
using FluentValidation.Results;
using System.Collections.Generic;
using System.Linq;

namespace SGJT.Application.Validators
{
    public static class ValidatorExtensions
    {
        public static IList<ValidationError> GetValidationResultErrors(this ValidationResult validationResult)
        {
            IList<ValidationError> validationErrors = new List<ValidationError>();
            IDictionary<string, IList<string>> results = new Dictionary<string, IList<string>>();

            foreach (var error in validationResult.Errors)
            {
                string propertyName = char.ToLowerInvariant(error.PropertyName[0]) + error.PropertyName.Substring(1);

                if (!results.ContainsKey(propertyName))
                {
                    results.Add(propertyName, new List<string>());
                }
                
                results[propertyName].Add(error.ErrorMessage);
            }

            foreach (var result in results)
            {
                validationErrors.Add(new ValidationError { PropertyName = result.Key, Errors = result.Value });
            }

            return validationErrors;
        }

        public static IRuleBuilderOptions<T, string> MustNotContainsNumber<T>(this IRuleBuilder<T, string> ruleBuilder)
        {
            return ruleBuilder.Must(a => !a.Any(char.IsDigit));
        }
    }
}
