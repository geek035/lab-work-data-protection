using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
namespace Backend.validators;

public class UsersOnlyAttribute : ActionFilterAttribute
{
    public override void OnActionExecuting(ActionExecutingContext context)
    {
        var httpContext = context.HttpContext;
        var user = httpContext.User;
    
        var username = user.FindFirst("Username")?.Value;

        if (username == null)
        {
            context.Result = new ForbidResult(); 
        }

        base.OnActionExecuting(context);
    }
}