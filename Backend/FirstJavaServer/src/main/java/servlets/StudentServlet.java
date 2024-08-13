package servlets;

import database.StudentDAO;
import model.Student;
import service.student.StudentService;

import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;


import java.util.List;

import jsonParser.JSONParser;
import org.json.JSONArray;
import org.json.JSONObject;


@WebServlet(name = "StudentServlet", value = "/student-servlet")
public class StudentServlet extends HttpServlet {
    public void doPost(HttpServletRequest request, HttpServletResponse response) {
        try {
            if (!request.getContentType().contentEquals("application/json")) {
                response.setStatus(403);
                response.getWriter().print("The incorrect content-type of HTTP request");
                return;
            }
            JSONObject studentJSON = JSONParser.getRequestJSON(request.getReader());
            System.out.println(studentJSON);

            Student student = Student.getStudFromJSON(studentJSON);

            if(student != null) {
                StudentDAO studentDAO = new StudentDAO();
                int addResult = studentDAO.addNewStudent(student);
                if (StudentService.isCorrectStudent(student) && addResult > 0) {
                    response.setStatus(200);
                    response.getWriter().print(studentJSON);
                } else if (addResult == -10) {
                    response.setStatus(400);
                    response.getWriter().print("Student " + student.getFirstName() + " " + student.getLastName() +
                            " is already in the table");
                } else if (!StudentService.isCorrectStudent(student)) {
                    response.setStatus(400);
                    response.getWriter().print(StudentService.getErrorMessage(studentJSON) + " of student object");
                } else {
                    response.setStatus(500);
                    response.getWriter().print("Web server request to add a student to the database error");
                }
            }
        }
        catch(Exception error) {
            error.printStackTrace();
            StudentService.setDefErrorMsg(response);
        }
    }
    public void doPut(HttpServletRequest request, HttpServletResponse response) {
        try {
            if(!request.getContentType().equals("application/json")) {
                response.setStatus(403);
                response.getWriter().print("The incorrect content-type of HTTP request");
                return;
            }
            JSONObject studentJSON = JSONParser.getRequestJSON(request.getReader());
            Student student = Student.getStudFromJSON(studentJSON);
            StudentDAO studentDAO = new StudentDAO();
            if(StudentService.isCorrectStudent(student) && studentDAO.editStudent(student) > 0) {
                response.setStatus(200);
                response.getWriter().print(studentJSON);
            } else if(!StudentService.isCorrectStudent(student)) {
                response.setStatus(400);
                response.getWriter().print("The incorrect parameter of student object");
            } else {
                response.setStatus(500);
                response.getWriter().print("Web server request to edit a student to the database error");
            }
        }
        catch(Exception error) {
            error.printStackTrace();
            StudentService.setDefErrorMsg(response);
        }
    }
    public void doDelete(HttpServletRequest request, HttpServletResponse response) {
        try {
            if(!request.getContentType().equals("application/json")) {
                response.setStatus(403);
                response.getWriter().print("The incorrect content-type of HTTP request");
            }
            JSONObject studentJSON = JSONParser.getRequestJSON(request.getReader());
            Student student = Student.getStudFromJSON(studentJSON);
            StudentDAO studentDAO = new StudentDAO();
            if(StudentService.isCorrectStudent(student) &&
                    studentDAO.deleteStudent(student.getStudent_id()) > 0) {
                response.setStatus(200);
                response.getWriter().print(studentJSON);
            } else if(!StudentService.isCorrectStudent(student)) {
                response.setStatus(400);
                response.getWriter().print("The incorrect parameter of student object");
            } else {
                response.setStatus(500);
                response.getWriter().print("Web server request to delete a student to the database error");
            }
        }
        catch(Exception error) {
            error.printStackTrace();
            StudentService.setDefErrorMsg(response);
        }
    }
    public void doGet(HttpServletRequest request, HttpServletResponse response) {
        try {
            StudentDAO studentDB = new StudentDAO();
            JSONArray jsonArray = new JSONArray();
            List<Student> studentList;
            if(request.getParameter("limit") != null || request.getParameter("offset") != null) {
                studentList = studentDB.getStudents(Integer.parseInt(request.getParameter("limit")),
                                                    Integer.parseInt(request.getParameter("offset")));
            } else {
                studentList = studentDB.getStudents(0, 0);
            }
            for(Student student : studentList) {
               jsonArray.put(student.toJSON());
            }
            response.setStatus(200);
            response.getWriter().print(jsonArray);
        }
        catch(Exception error) {
            error.printStackTrace();
            StudentService.setDefErrorMsg(response);
        }

    }


}
