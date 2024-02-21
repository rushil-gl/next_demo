import React, { Suspense } from "react";
import classes from "./page.module.css";
import Link from "next/link";
import MealsGrid from "@/components/meals/meals-grid";
import { getMeals } from "@/lib/meals";

async function Meals() {
	const meals = await getMeals();
	return <MealsGrid meals={meals} />;
}

const MealsPage = async () => {
	return (
		<>
			<header className={classes.header}>
				<h1>Delicious Meals, created </h1>
				<p>Choose your favourite receipe and cook it yourself. It is fun!</p>
				<p className={classes.cta}>
					<Link href="/meals/share">Share Your Favourite Recipe</Link>
				</p>
			</header>
			<main className={classes.main}>
				<Suspense fallback={<p className={classes.loading}>Loading...</p>}>
					<Meals />
				</Suspense>
			</main>
		</>
	);
};

export default MealsPage;
