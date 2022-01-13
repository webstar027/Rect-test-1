import React from "react";
import { render, screen, within, fireEvent } from "@testing-library/react";
import { default as PhotoGallery, Photo } from "../PhotoGallery";
import faker from "faker";

describe("PhotoGallery component", () => {
  it("renders photos information", () => {
    const photos = [createTestPhoto(), createTestPhoto(), createTestPhoto()];
    render(<PhotoGallery photos={photos} currentPage={1} totalPages={1} />);

    const photoElements = screen.getAllByTestId("image-list-photo");

    expect(photoElements.length).toBe(photos.length);
    photos.forEach((photo, index) => {
      expect(within(photoElements[index]).getByText(photo.description as string)).toBeInTheDocument();
      expect(within(photoElements[index]).getByText(photo.user.name)).toBeInTheDocument();
    });
  });

  it("calls onPageChange when pagination changes", () => {
    const photos = [createTestPhoto(), createTestPhoto(), createTestPhoto()];
    const currentPage = 1;
    const onPageChangeHandler = jest.fn();
    render(
      <PhotoGallery photos={photos} currentPage={currentPage} totalPages={2} onPageChange={onPageChangeHandler} />
    );

    const newPage = currentPage + 1;
    const secondPageButton = within(screen.getByTestId("photo-gallery--pagination")).getByText(newPage);
    fireEvent.click(secondPageButton);

    expect(onPageChangeHandler).toHaveBeenCalledWith(newPage);
  });
});

function createTestPhoto(): Photo {
  return {
    id: faker.datatype.uuid(),
    alt_description: faker.lorem.sentence(),
    description: faker.lorem.sentence(),
    urls: {
      thumb: faker.image.imageUrl(),
    },
    user: {
      name: faker.name.lastName(),
    },
  };
}
