import { useMemo } from "react";
import type { AnimationVariants, ContainerVariants } from "@/types/common";
import { ANIMATION_CONSTANTS } from "@/types/common";

export function useAnimations() {
	const containerVariants = useMemo(
		(): ContainerVariants => ({
			hidden: { opacity: 0 },
			visible: {
				opacity: 1,
				transition: {
					staggerChildren: ANIMATION_CONSTANTS.STAGGER_DELAY,
					delayChildren: ANIMATION_CONSTANTS.CHILDREN_DELAY,
				},
			},
		}),
		[]
	);

	const itemVariants = useMemo(
		(): AnimationVariants => ({
			hidden: { opacity: 0, y: 20 },
			visible: {
				opacity: 1,
				y: 0,
				transition: {
					duration: ANIMATION_CONSTANTS.DURATION,
					ease: ANIMATION_CONSTANTS.EASE,
				},
			},
		}),
		[]
	);

	const heroVariants = useMemo(
		(): AnimationVariants => ({
			hidden: { opacity: 0, y: 30 },
			visible: {
				opacity: 1,
				y: 0,
				transition: {
					duration: ANIMATION_CONSTANTS.HERO_DURATION,
					ease: ANIMATION_CONSTANTS.HERO_EASE,
				},
			},
		}),
		[]
	);

	const fadeInVariants = useMemo(
		(): AnimationVariants => ({
			hidden: { opacity: 0 },
			visible: {
				opacity: 1,
				transition: {
					duration: ANIMATION_CONSTANTS.DURATION,
					ease: ANIMATION_CONSTANTS.EASE,
				},
			},
		}),
		[]
	);

	return {
		containerVariants,
		itemVariants,
		heroVariants,
		fadeInVariants,
	};
}
