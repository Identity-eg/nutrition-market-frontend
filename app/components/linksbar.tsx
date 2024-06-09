import Link from 'next/link';

const links = [
    { id: '1', label: 'Home', to: '/' },
    { id: '2', label: 'Products', to: '/' },
    { id: '3', label: 'Benefit health', to: '/' },
    { id: '4', label: 'Contact us', to: '/' },
    { id: '5', label: 'About us', to: '/' },
];

export function Linksbar() {
    return (
        <div className="border-b-gray-2 text-black-3 media-md:block hidden border-b">
            <div className="container flex items-center font-medium">
                {links.map(link => (
                    <Link key={link.id} href={link.to} className="px-4 py-4 transition-all typography-M14">
                        {link.label}
                    </Link>
                ))}
            </div>
        </div>
    );
}
