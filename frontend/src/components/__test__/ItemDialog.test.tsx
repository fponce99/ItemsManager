import { render, screen, fireEvent } from '@testing-library/react';
import ItemDialog from '../ItemDialog';
import '@testing-library/jest-dom';


describe('ItemDialog', () => {
    const mockOnClose = jest.fn();
    const mockOnChange = jest.fn();
    const mockOnSubmit = jest.fn();

    const formData = {
        name: 'Item Name',
        description: 'Item Description',
        price: 10,
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders with form fields', () => {
        render(
            <ItemDialog
                open={true}
                onClose={mockOnClose}
                formData={formData}
                onChange={mockOnChange}
                onSubmit={mockOnSubmit}
                isEditing={false}
            />
        );

        expect(screen.getByLabelText(/name/i)).toHaveValue(formData.name);
        expect(screen.getByLabelText(/description/i)).toHaveValue(formData.description);
        expect(screen.getByLabelText(/price/i)).toHaveValue(formData.price);
    });

    it('calls onChange when inputs change', () => {
        render(
            <ItemDialog
                open={true}
                onClose={mockOnClose}
                formData={formData}
                onChange={mockOnChange}
                onSubmit={mockOnSubmit}
                isEditing={false}
            />
        );

        fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'New Name', name: 'name' } });
        expect(mockOnChange).toHaveBeenCalled();

        fireEvent.change(screen.getByLabelText(/description/i), { target: { value: 'New Desc', name: 'description' } });
        expect(mockOnChange).toHaveBeenCalled();

        fireEvent.change(screen.getByLabelText(/price/i), { target: { value: '20', name: 'price' } });
        expect(mockOnChange).toHaveBeenCalled();
    });

    it('calls onSubmit when form is submitted', () => {
        render(
            <ItemDialog
                open={true}
                onClose={mockOnClose}
                formData={formData}
                onChange={mockOnChange}
                onSubmit={mockOnSubmit}
                isEditing={false}
            />
        );

        fireEvent.click(screen.getByRole('button', { name: /add item/i }));
        expect(mockOnSubmit).toHaveBeenCalled();
    });
});
