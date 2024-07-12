const BASE_URL = import.meta.env.VITE_BASE_URL

export const fetchClasses = async () => {
	let data
	try {
		const response = await fetch(`${BASE_URL}/api/getAllClasses`);
		if (!response.ok) {
			throw new Error('Failed to get all classes')
		}
		data = await response.json()
		return data
	} catch(err) {
		console.error(err)
	}
}

export const fetchStudents = async () => {
	let data
	try {
		const response = await fetch(`${BASE_URL}/api/getAllStudents`);
		if (!response.ok) {
			throw new Error('Failed to get all students')
		}
		data = await response.json()
		return data
	} catch(err) {
		console.error(err)
	}
}

export const upsertStudent = async (studentData) => {
	try {
		const response = await fetch(`${BASE_URL}/api/upsertStudent`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				id: studentData.id,
				studentid: studentData.studentid,
				fullname: studentData.fullname,
				major: studentData.major,
				expectedgraddate: studentData.expectedgraddate,
				final_grades: studentData.final_grades,
			}),
		})
		
		if (!response.ok) {
			throw new Error('Error on inserting student')
		}
		
		const result = await response.json()
		return result
	} catch(err) {
		console.error(err)
	}
}

export const upsertClass = async (classData) => {
	try {
		const response = await fetch(`${BASE_URL}/api/upsertClass`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				id: classData.id,
				classid: classData.classid,
				name: classData.name,
				semester: classData.semester,
				maxstudents: classData.maxstudents,
				studentsenrolled: classData.studentsenrolled,
				subject: classData.subject
			}),
		})
		
		if (!response.ok) {
			throw new Error('Error on inserting class')
		}
		
		const result = await response.json()
		return result
	} catch(err) {
		console.error(err)
	}
}


export const deleteClassById = async (id) => {
	try {
		const response = await fetch(`${BASE_URL}/api/deleteClass/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		if (!response.ok) {
			throw new Error(`Failed to delete class ID ${id}`)
		}
		return
	} catch(err) {
		console.error(err)
	}
}

export const deleteStudentById = async (id) => {
	try {
		const response = await fetch(`${BASE_URL}/api/deleteStudent/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		if (!response.ok) {
			throw new Error(`Failed to delete student ID ${id}`)
		}
		return
	} catch(err) {
		console.error(err)
	}
}

export const fetchStudentClassDataById = async (id) => {
	let data
	try {
		const response = await fetch(`${BASE_URL}/api/allClassesOfStudentId/${id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		})
		data = await response.json()
		if (!response.ok) {
			throw new Error(`Failed to retrieve student class data for studentId:${id}`)
		}
		return data
	} catch(err) {
		console.error(err)
		return null
	}
}

export const fetchClassesAvailableToStudent = async (id) => {
	let data
	try {
		const response = await fetch(`${BASE_URL}/api/classesAvailableToStudent/${id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		})
		if (!response.ok) {
			throw new Error(`Failed to retrieve student classes available for studentId:${id}`)
		}
		data = await response.json()
		return data
	} catch(err) {
		console.error(err)
		return null
	}
}

export const addClassToStudent = async (studentId, classId) => {
	let data
	try {
		const response = await fetch(`${BASE_URL}/api/studentsclasses/`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				student_id: studentId,
				class_id: classId,
			}),
		})
		data = await response.json()
		if (!response.ok) {
			throw new Error(`Failed to give StudentID:${studentId} ClassID:${classId}`)
		}
		return data
	} catch(err) {
		console.error(err)
		return null
	}
}

export const deleteClassFromStudent = async (studentId, classId) => {
	try {
		const response = await fetch(`${BASE_URL}/api/studentsclasses/student/${studentId}/class/${classId}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		if (!response.ok) {
			throw new Error(`Failed to delete student ID ${studentId} tie to class ID ${classId}`)
		}
		return
	} catch(err) {
		console.error(err)
	}
}