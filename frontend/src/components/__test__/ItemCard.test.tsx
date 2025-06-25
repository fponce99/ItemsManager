import { render, screen, fireEvent } from '@testing-library/react';
import ItemCard from '../ItemCard';
import '@testing-library/jest-dom';

const mockItem = {
    id: 1,
    name: 'Test Item',
    description: 'Test Description',
    price: 9.99,
};

describe('ItemCard', () => {
    it('renders item data correctly', () => {
        render(<ItemCard item={mockItem} onEdit={() => {}} onDelete={() => {}} />);
        expect(screen.getByText('Test Item')).toBeInTheDocument();
        expect(screen.getByText('Test Description')).toBeInTheDocument();
        expect(screen.getByText('9.99')).toBeInTheDocument();
    });

    it('calls onEdit when edit button clicked', () => {
        const onEdit = jest.fn();
        render(<ItemCard item={mockItem} onEdit={onEdit} onDelete={() => {}} />);
        fireEvent.click(screen.getByLabelText(/edit/i));
        expect(onEdit).toHaveBeenCalledWith(mockItem);
    });

    it('calls onDelete when delete button clicked', () => {
        const onDelete = jest.fn();
        render(<ItemCard item={mockItem} onEdit={() => {}} onDelete={onDelete} />);
        fireEvent.click(screen.getByLabelText(/delete/i));
        expect(onDelete).toHaveBeenCalledWith(mockItem.id);
    });
});
