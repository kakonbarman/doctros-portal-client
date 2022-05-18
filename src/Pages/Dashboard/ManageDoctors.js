import React from "react";
import { useQuery } from "react-query";
import Loading from "../Shared/Loading/Loading";
import ManageDoctorsRow from "./ManageDoctorsRow";

const ManageDoctors = () => {
	const {
		data: doctors,
		isLoading,
		refetch,
	} = useQuery("doctors", () =>
		fetch("http://localhost:5000/doctor", {
			headers: {
				authorization: `Bearer ${localStorage.getItem("access_token")}`,
			},
		}).then((res) => res.json())
	);

	if (isLoading) {
		return <Loading></Loading>;
	}

	return (
		<div>
			<h2 className="text-2xl">Manage Doctors {doctors.length}</h2>
			<div className="overflow-x-auto">
				<table className="table w-full">
					<thead>
						<tr>
							<th></th>
							<th>Avatar</th>
							<th>Name</th>
							<th>Specialty</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{doctors.map((doctor, index) => (
							<ManageDoctorsRow
								key={doctor._id}
								doctor={doctor}
								index={index}
								refetch={refetch}
							></ManageDoctorsRow>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default ManageDoctors;
