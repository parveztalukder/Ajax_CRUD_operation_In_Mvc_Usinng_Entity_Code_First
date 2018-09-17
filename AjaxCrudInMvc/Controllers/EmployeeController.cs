using AjaxCrudInMvc.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AjaxCrudInMvc.Controllers
{
    public class EmployeeController : Controller
    {
        ApplicationDbContext db = new ApplicationDbContext();
        // GET: Employee
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult getEmployeeAll()
        {
            return Json(db.Employees.ToList(),JsonRequestBehavior.AllowGet);
        }
        public ActionResult getEmloyeeById(int id)
        {
            var emp = db.Employees.ToList().Find(i => i.Id == id);
            return Json(emp,JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
       public ActionResult Create([Bind(Exclude ="Id")] Employee employee)
        {
            if (ModelState.IsValid)
            {
                db.Employees.Add(employee);
                db.SaveChanges();
            }
            return Json(employee,JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult Update(Employee employee)
        {
            if (ModelState.IsValid)
            {
                db.Entry(employee).State = EntityState.Modified;
                db.SaveChanges();
            }
            return Json(employee,JsonRequestBehavior.AllowGet);
           
        }
        [HttpPost]
        public ActionResult Delete(int id)
        {
            var emp = db.Employees.ToList().Find(i => i.Id == id);
            if (emp != null)
            {
                db.Employees.Remove(emp);
                db.SaveChanges();
            }
            return Json(emp,JsonRequestBehavior.AllowGet);
        }
    }
}