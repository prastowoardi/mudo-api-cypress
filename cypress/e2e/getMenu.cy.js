describe ('Get List Menu', () => {
    let idValue = []
    it('Get List Menu', () => {
        cy.request({
            method: 'GET',
            url: '/menus?perPage=100',
        }).then ((response) => {
            if (response.status === 200) {
                expect(response.status).to.eq(200)
                expect(response.body).to.be.an('object')

                const menu = response.body.data.Data
                menu.forEach((menu) => {
                    if (menu.hasOwnProperty('id')){
                        idValue.push(menu.id);
                        cy.log(`ID : ${menu.id}`, `Name : ${menu.name}`)
                    }
                });
            } else {
                cy.log(response.status)
            }
        })
    })

    it('Get Detail Menu', () => {
        const randomId = Math.floor(Math.random() * idValue.length)
        const id = randomId
        cy.request({
            method: 'GET',
            url: `/menu/${id}`,
            failOnStatusCode: false
        }).then ((response) => {
            if (response.status === 200) {
                expect(response.status).to.eq(200)
                cy.log(`ID : ${id}`, JSON.stringify(response.body))
            } 
            if (response.status === 400) {
                expect(response.status).to.eq(400)
                let message = JSON.stringify(response.body.message)
                throw new Error(`ID : ${id}, ${message}`)
            } 
            if (response.status === 500) {
                expect(response.status).to.eq(500)
                throw new Error('Server Error')
            } 
        })
    })
})