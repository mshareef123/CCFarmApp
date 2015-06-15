<%@page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>


<%@ taglib prefix="core" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>

<!DOCTYPE HTML>
<html>
<head>
<title>Spring Sample - Successful Login</title>
</head>
<body>
	<center>
		<h1>
			Welcome
			<core:out value="${user.fullName}" />
		</h1>
		<br> <a href="logout">Logout</a>
	</center>
</body>
</html>

