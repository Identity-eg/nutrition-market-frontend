import { icons } from './list';
import { cn } from 'lib/utils';

export type IconProps = React.ComponentProps<'i'> & {
	name: keyof typeof icons;
	viewBox?: number;
};

const Icon = (props: IconProps) => {
	const { name, viewBox = 24, className, ...rest } = props;
	return (
		<i
			className={cn(`line-clamp-[1em] flex size-[24px]`, className)}
			{...rest}>
			<svg
				preserveAspectRatio='none'
				viewBox={`0 0 ${viewBox} ${viewBox}`}>
				<path
					fill='currentColor'
					d={icons[name]}
				/>
			</svg>
		</i>
	);
};

export default Icon;
