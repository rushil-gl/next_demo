"use client";

import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
	return (
		<div className="mt-16 prompt_layout">
			{data.map((post) => (
				<PromptCard
					key={post._id}
					post={post}
					handleTagClick={handleTagClick}
				/>
			))}
		</div>
	);
};

const Feed = () => {
	const [searchText, setSearchText] = useState("");
	const [posts, setPosts] = useState([]);
	const [filteredPosts, setFilteredPosts] = useState([]);

	const filterPosts = (text) => {
		const regex = new RegExp(text, "i");
		return posts.filter(
			(post) =>
				post.prompt.search(regex) > -1 ||
				post.tag.search(regex) > -1 ||
				post.creator.username.search(regex) > -1
		);
	};

	const handleSearchChange = (event) => {
		setSearchText(event.target.value);
		if (!event.target.value) {
			setFilteredPosts(posts);
			return;
		}
		setFilteredPosts(filterPosts(event.target.value));
	};

	const handleTagClick = (value) => {
		setSearchText(value);
	};

	useEffect(() => {
		if (searchText) {
			setFilteredPosts(filterPosts(searchText));
		} else {
			setFilteredPosts(posts);
		}
	}, [searchText, posts]);

	useEffect(() => {
		const fetchPosts = async () => {
			const response = await fetch("/api/prompt");
			const data = await response.json();
			setPosts(data);
		};

		fetchPosts();
	}, []);

	return (
		<section className="feed">
			<form className="relative w-full flex-center">
				<input
					type="text"
					placeholder="Search"
					value={searchText}
					onChange={handleSearchChange}
					className="search_input peer"
					required
				/>
			</form>

			<PromptCardList data={filteredPosts} handleTagClick={handleTagClick} />
		</section>
	);
};

export default Feed;
