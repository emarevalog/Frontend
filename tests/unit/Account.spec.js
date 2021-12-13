import { mount } from '@vue/test-utils'
import Citas from '@/components/Citas.vue'

describe('Citas.vue', () => {

    let mockedData = {
        name: "Juan",
        email: "email@hotmail.com",
        balance: 30000,
        loaded: true
    }

    let wrapper = mount(Citas, {
        data() {
            return mockedData
        }
    });

    it('La asignación de datos al componente Citas no funciona de acueedo con lo esperado', async() => {

        expect(wrapper.text()).toMatch("Información de su cuentaNombre: JuanSaldo: 30000 COP Correo electrónico: email@hotmail.com");
    });
})