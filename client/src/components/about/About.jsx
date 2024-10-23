import styles from "./About.module.css";
import React from "react";
import styled from "styled-components";
import { FaHtml5, FaCss3Alt, FaReact } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io5";
import { TbBrandRedux } from "react-icons/tb";

export default function About(props) {
	const Technologies = styled.div`
		width: 40%;
		margin: 0 auto;
		padding: 1rem;
		text-align: start;
		color: #000;
		background-color: var(--blue);
		font-family: system-ui;
		font-size: 1.5rem;
	`;

	const Myself = styled.div`
		height: 100%;
		padding: 6rem 1rem 0;
		color: var(--blue);
		background-color: #000;

		display: flex;
		flex-flow: column;
		justify-content: space-between;
		align-items: center;
	`;

	const Photo = styled.img`
		width: 250px;
		margin-top: -2rem;
		filter: brightness(0.7) drop-shadow(0 0 10px rgb(160, 0, 210));
	`;

	return (
		<div className={styles.About}>
			<Myself>
				<h1>About</h1>
				<h2>Created by Joao Bone</h2>
				<Photo
					src="https://i.postimg.cc/4xDQrtnt/pfp-no-bg.png"
					alt="photo-of-mine"
				/>
			</Myself>
			<Technologies>
				<h3>Used Technologies</h3>
				<ul>
					<li>
						HTML <FaHtml5 />
					</li>
					<li>
						CSS <FaCss3Alt />{" "}
					</li>
					<li>
						JavaScript <IoLogoJavascript />
					</li>
					<li>
						React <FaReact />
					</li>
					<li>
						Redux <TbBrandRedux />
					</li>
				</ul>
			</Technologies>
		</div>
	);
}
