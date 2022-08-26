package controller

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/kevenmario/gorestful/src/dto"
	"github.com/kevenmario/gorestful/src/entity"
	"github.com/kevenmario/gorestful/src/helper"
	"github.com/kevenmario/gorestful/src/service"
)

type AuthController interface {
	Login(ctx *gin.Context)
	Register(ctx *gin.Context)
}
type authController struct {
	authService service.AuthService
	jwtService  service.JWTService
}

func NewAuthController(authService service.AuthService,
	jwtService service.JWTService) AuthController {
	return &authController{
		authService: authService,
		jwtService:  jwtService,
	}
}

func (c *authController) Login(ctx *gin.Context) {
	var loginDTO dto.LoginDto
	err := ctx.ShouldBind(&loginDTO)
	if err != nil {
		response := helper.BuildErrorResponse("Failed to process request", err.Error(), helper.EmptyObj{})
		ctx.AbortWithStatusJSON(http.StatusBadRequest, response)
		return
	}
	authResult := c.authService.VerifyCredential(loginDTO.Email, loginDTO.Password)
	if v, ok := authResult.(entity.User); ok {
		generatedToken := c.jwtService.GenerateToken(strconv.FormatUint(v.ID, 10))
		v.Token = generatedToken
		reponse := helper.BuildResponse(true, "OK!", v)
		ctx.JSON(http.StatusOK, reponse)
		return
	}
	response := helper.BuildErrorResponse("Please check again your credential", "Invalid credential", authResult)
	ctx.AbortWithStatusJSON(http.StatusUnauthorized, response)
}

func (c *authController) Register(ctx *gin.Context) {
	var registerDTO dto.RegisterDTO

	errDTO := ctx.ShouldBind(&registerDTO)

	if errDTO != nil {
		response := helper.BuildErrorResponse("Failed to process request", errDTO.Error(), helper.EmptyObj{})
		ctx.AbortWithStatusJSON(http.StatusBadRequest, response)
		return
	}

	if !c.authService.IsDuplicateEmail(registerDTO.Email) {
		response := helper.BuildErrorResponse("Failed to process request", "Duplicate Email", helper.EmptyObj{})
		ctx.AbortWithStatusJSON(http.StatusConflict, response)
	} else {
		createUser := c.authService.CreateUser(registerDTO)
		token := c.jwtService.GenerateToken(strconv.FormatUint(createUser.ID, 10))
		createUser.Token = token
		response := helper.BuildResponse(true, "OK!", createUser)
		ctx.JSON(http.StatusCreated, response)
	}
}
