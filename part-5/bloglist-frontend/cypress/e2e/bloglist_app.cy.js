describe('Bloglist app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.addUser({
      name: 'John Doe',
      username: 'john',
      password: 'pass',
    })
    cy.addUser({
      name: 'jane Doe',
      username: 'jane',
      password: 'pass',
    })
    cy.visit('http://localhost:3000')
  })
  it('Login form is shown', function () {
    cy.contains('Log in to application')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('john')
      cy.get('#password').type('pass')
      cy.contains('Login').click()

      cy.contains('John Doe logged in')
    })

    it('failse with wrong credentials', function () {
      cy.get('#username').type('john')
      cy.get('#password').type('wrong pass')
      cy.contains('Login').click()
      cy.get('.error')
        .should('contain', 'invalid credentials')
        .should('have.css', 'color', 'rgb(255, 0, 0)')
        .should('have.css', 'background-color', 'rgba(255, 99, 71, 0.2)')
    })
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.login('john', 'pass')
    })

    it('add new blog', function () {
      cy.contains('New blog').click()
      cy.get('#title').type('new blog')
      cy.get('#author').type('someone')
      cy.get('#url').type('http://somewhere/far')
      cy.get('#create-btn').click()
      cy.contains('new blog')
    })

    describe('there is one blog', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'testing with cypress',
          author: 'someone',
          url: 'http://somewhere/far',
        })
      })

      it('like a blog', function () {
        cy.contains('view').click()
        cy.contains('likes 0')
        cy.contains('like').click()
        cy.contains('likes 1')
      })

      it('delete own blog', function () {
        cy.contains('view').click()
        cy.contains('Delete').click()
        cy.get('.blogs').should('not.contain', 'testing with cypress')
      })

      describe('logged in as another user', function () {
        beforeEach(function () {
          cy.login('jane', 'pass')
        })

        it('cannot delete anthor users blog', function () {
          cy.contains('view').click()
          cy.contains('Delete').click()
          cy.get('.error').contains(
            'you cannot delete a blog that you haven\'t created'
          )
        })
      })
    })

    it('blogs are ordered', function () {
      cy.createBlog({
        title: 'blog one',
        author: 'someone',
        url: 'http://somewhere/far',
        likes: 1,
      })
      cy.createBlog({
        title: 'blog two',
        author: 'someone',
        url: 'http://somewhere/far',
        likes: 3
      })
      cy.get('.blog:first').should('contain', 'blog two')
      cy.get('.blog:last').should('contain', 'blog one')
    })
  })
})
