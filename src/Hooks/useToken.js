import { useEffect, useState } from "react";
const useToken = (user) => {
	const [token, setToken] = useState("");

	useEffect(() => {
		const email = user?.user?.email;
		const currentUser = { email: email };

		if (email) {
			console.log("asce re....");
			fetch(`https://glacial-spire-41863.herokuapp.com/user/${email}`, {
				method: "PUT",
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify(currentUser),
			})
				.then((res) => res.json())
				.then((data) => {
					const accessToken = data.token;
					localStorage.setItem("access_token", accessToken);
					setToken(accessToken);
				});
		}
	}, [user]);

	return [token];
};

export default useToken;