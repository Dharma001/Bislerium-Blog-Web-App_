import { useState } from 'react';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const categories = ['All', 'Technology', 'Science', 'Art', 'Health'];
    const tags = ['JavaScript', 'Python', 'Machine Learning', 'Photography', 'Fitness'];

    return (
        <div className={`fixed inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} bg-gray-50 w-64 overflow-y-auto transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-auto`}>
            <div className="flex flex-col justify-between h-full p-4">
                <div>

                    <div className="mb-4">
                        <label htmlFor="category" className="text-black mb-2">Category</label>
                        <select
                            id="category"
                            className="w-full p-2 rounded-md text-black bg-gray-50"
                        >
                            {categories.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <div className="mb-4">
                            <label htmlFor="category" className="text-black mb-2">Tags</label>
                            <select
                                id="Tags"
                                className="w-full p-2  rounded-md text-black bg-gray-50"
                            >
                                {tags.map((tag) => (
                                    <option key={tag} value={tag}>
                                        {tag}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            {/* Toggle Button for smaller screens */}
            <div className="lg:hidden">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="fixed inset-y-0 right-0 p-4 text-black bg-gray-50"
                >
                    {isOpen ? 'Close' : 'Menu'}
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
