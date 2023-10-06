// CategoryList.tsx
import React, { useState } from 'react';
import { Category } from '../../interfaces';

interface Props {
  categories: Category[];
  onCategoriesChange: (categories: Category[]) => void;
}

const CategoryList: React.FC<Props> = ({ categories, onCategoriesChange }) => {
  const [isEditing, setIsEditing] = useState<number | null>(null);

  const handleEdit = (index: number) => {
    if (!categories[index].isMain) {
      setIsEditing(index);
    }
  };

  const handleSave = (index: number, newName: string) => {
    const newCategories = [...categories];
    newCategories[index].name = newName;
    setIsEditing(null);
    onCategoriesChange(newCategories);
  };

  const handleAdd = () => {
    onCategoriesChange([...categories, { isMain: false, order: categories.length, name: '' }]);
    setIsEditing(categories.length);
  };

  // TODO: Implement drag and drop reordering functionality

  return (
    <div>
      {categories.map((category, index) => (
        <div key={index} onClick={() => handleEdit(index)}>
          {isEditing === index ? (
            <input
              autoFocus
              defaultValue={category.name}
              onBlur={(e) => handleSave(index, e.target.value)}
            />
          ) : (
            category.name
          )}
        </div>
      ))}
      <button onClick={handleAdd}>Add Category</button>
    </div>
  );
};

export default CategoryList;
