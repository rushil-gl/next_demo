"use client";

import { useRef, useState } from "react";
import classes from "./image-picker.module.css";
import Image from "next/image";

export default function ImagePicker({ label, name }) {
	const [image, setimage] = useState();
	const inputRef = useRef();

	function handleImageChange(event) {
		const [file] = event.target.files;

		if (!file) {
			setPickedImage(null);
			return;
		}

		const fileReader = new FileReader();
		fileReader.onload = () => setimage(fileReader.result);
		fileReader.readAsDataURL(file);
	}

	function handlePickCllick() {
		inputRef.current.click();
	}

	return (
		<div className={classes.picker}>
			<label htmlFor={name}>{label}</label>
			<div className={classes.controls}>
				<div className={classes.preview}>
					{!image && <p>No image picked yet</p>}
					{image && <Image src={image} alt="Image" fill />}
				</div>
				<input
					className={classes.input}
					type="file"
					id={name}
					accept="image/png, image/jpeg"
					name={name}
					ref={inputRef}
					onChange={handleImageChange}
					required
				/>
				<button
					type="button"
					className={classes.button}
					onClick={handlePickCllick}
				>
					Pick an Image
				</button>
			</div>
		</div>
	);
}
