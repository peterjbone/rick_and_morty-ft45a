import styles from "./About.module.css";
import React from "react";
import styled from "styled-components";
import { FaHtml5, FaCss3Alt, FaReact } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io5";
import { TbBrandRedux } from "react-icons/tb";
import { SiStyledcomponents } from "react-icons/si";
import { SiMongodb } from "react-icons/si";
import { SiMongoose } from "react-icons/si";

export default function About(props) {
	const Myself = styled.div`
		height: 100%;
		padding: 6rem 2rem 0;
		color: #fff;
		background-color: #000;

		display: flex;
		flex-flow: column nowrap;
		justify-content: flex-end;
		align-items: center;
	`;

	const Photo = styled.img`
		width: 250px;
		margin-top: -2rem;
		filter: brightness(0.9);
	`;

	const Technologies = styled.div`
		width: 40%;
		margin: 0 auto;
		padding: 1rem 2rem;
		text-align: start;
		color: #000;
		background-color: var(--blue);
		/* 	font-family: system-ui; */
		font-size: 1.5rem;
	`;

	//**************************************** ABOUT COMPONENT (VIEW)
	return (
		<div className={styles.about}>
			<Myself>
				<h2>Created by Joao Bone</h2>
				<i>Full stack developer</i>
				<Photo
					src="https://i.postimg.cc/4xDQrtnt/pfp-no-bg.png"
					alt="photo-of-mine"
				/>
			</Myself>
			<Technologies>
				<h3>Used Technologies</h3>
				<ul>
					<li>
						HTML <FaHtml5 className={styles.icon} />
					</li>
					<li>
						CSS <FaCss3Alt className={styles.icon} />{" "}
					</li>
					<li>
						JavaScript <IoLogoJavascript className={styles.icon} />
					</li>
					<li>
						React <FaReact className={styles.icon} />
					</li>
					<li>
						Redux <TbBrandRedux className={styles.icon} />
					</li>
					<li>
						Styled components <SiStyledcomponents className={styles.icon} />
					</li>
					<li>
						MongoDB <SiMongodb className={styles.icon} />
					</li>
					<li>
						Mongoose <SiMongoose className={styles.icon} />
					</li>
				</ul>
			</Technologies>
		</div>
	);
}
