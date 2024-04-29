import { useState } from 'react';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const categories = ['All', 'Technology', 'Science', 'Art', 'Health'];
    const tags = ['JavaScript', 'Python', 'Machine Learning', 'Photography', 'Fitness'];

    return (
        <div className={`fixed inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} bg-gray-800 w-64 overflow-y-auto transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-auto`}>
            <div className="flex flex-col justify-between h-full p-4">
                <div>
                    <h2 className="text-2xl font-bold text-white mb-4">Filters</h2>
                    <div className="mb-4">
                        <label htmlFor="category" className="text-white mb-2">Category</label>
                        <select
                            id="category"
                            className="w-full p-2 border border-gray-700 rounded-md text-white bg-gray-800"
                        >
                            {categories.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white mb-2">Tags</h3>
                        <div className="space-y-2">
                            {tags.map((tag) => (
                                <button
                                    key={tag}
                                    className="flex items-center space-x-2 p-2 rounded-md text-white bg-gray-700 hover:bg-gray-600"
                                >
                                    <span>{tag}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {/* Toggle Button for smaller screens */}
            <div className="lg:hidden">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="fixed inset-y-0 right-0 p-4 text-white bg-gray-800"
                >
                    {isOpen ? 'Close' : 'Menu'}
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
