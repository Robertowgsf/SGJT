using System.Collections.Generic;

namespace SGJT.Application.Validators
{
    public class ValidationError
    {
        public string PropertyName { get; set; }
        public IList<string> Errors { get; set; }
    }
}
