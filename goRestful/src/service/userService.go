package service

import (
	"log"

	"github.com/kevenmario/gorestful/src/dto"
	"github.com/kevenmario/gorestful/src/entity"
	"github.com/kevenmario/gorestful/src/repository"
	"github.com/mashingan/smapping"
)

type UserService interface {
	Update(user dto.UserUpdateDTO) entity.User
	Profile(userID string) entity.User
}
type userService struct {
	userRepository repository.UserRepository
}

func NewUserService(userRepo repository.UserRepository) UserService {
	return &userService{
		userRepository: userRepo,
	}
}

func (service *userService) Profile(userID string) entity.User {
	return service.userRepository.ProfileUser(userID)
}

func (service *userService) Update(user dto.UserUpdateDTO) entity.User {
	userToUpdate := entity.User{}
	err := smapping.FillStruct(&userToUpdate, smapping.MapFields(&user))
	if err != nil {
		log.Fatalf("Failed map %v:", err)
	}
	updateUser := service.userRepository.UpdateUser(userToUpdate)
	return updateUser
}
