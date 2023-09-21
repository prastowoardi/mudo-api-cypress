describe('Get Bidang Strudi', () => {
    before(() => {
        cy.accessToken()
    })
    it('Get Bidang Studi', () => {
        cy.request({
            method: 'GET',
            url: '/referensi/bidang_studi',
            headers: {
                'Authorization': `Bearer ${Cypress.env('accessToken')}`,
            },
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.be.an('array')

            // Loop melalui setiap objek dalam array
            response.body.forEach((item) => {
                if (item.hasOwnProperty('id')) {
                    // Tampilkan data yang memiliki properti 'id' dalam log
                    cy.log(JSON.stringify(item)) // Menggunakan JSON.stringify() untuk tampilan yang lebih baik
                } else {
                    cy.log("Tidak ada id pada respon body")
                }
            })
        })
    })
})