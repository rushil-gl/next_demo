"use client";

import Profile from "@components/Profile";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";

const MyProfile = () => {
	const [posts, setPosts] = useState([]);
	const params = useParams();

	useEffect(() => {
		const fetchPosts = async () => {
			const response = await fetch(`/api/users/${params.id}/posts`);
			const data = await response.json();
			setPosts(data);
		};

		fetchPosts();
	}, []);

	return (
		<Profile
			name="Other"
			description="Welcome to your personalized profile page"
			data={posts}
			handleEdit={() => {}}
			handleDelete={() => {}}
		/>
	);
};

export default MyProfile;
