import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-politicas',
  templateUrl: './politicas.component.html',
  styleUrls: ['./politicas.component.scss'],
})
export class PoliticasComponent implements OnInit {

  politicas: string = `

  <h1>TÉRMINOS Y CONDICIONES DE USO DE LA APLICACIÓN MÁS CHAMBA</h1>
  <p>Los términos y condiciones de uso de la aplicación <b>Más Chamba</b> , propiedad de <b>Más Capacitación</b> , contiene las reglas y permisos que rigen el uso de la aplicación tanto para prestadores, cómo para usuarios que deseen acceder y/o usar los servicios proporcionados por Más Chamba. En cuyo caso el Usuario está sujeto a los términos y condiciones establecidos y que rigen a dichos servicios, así como los anexos aplicables a los mismos.
  <br>
  La aplicación Más Chamba es una herramienta que busca facilitar el acceso a prestadores de servicios de calidad en el área de electricidad y plomería en la ciudad de Oaxaca. Por medio de Más Chamba, buscamos que el nivel de empleabilidad de personas capacitadas por Más Capacitación pueda llegar a ser mayor y, a su vez, comiencen a generar una cartera sólida de clientes.
  <br>
  Para el funcionamiento correcto de la aplicación es necesario el funcionamiento de funciones y comportamientos realizados para la aplicación. A continuación veremos desglosada de una manera entendible y clara los puntos más importantes de los acuerdos e información pertinente del funcionamiento de la aplicación:</p>

  <h2>Datos personales recopilados</h2>
  <p>En el uso de la aplicación móvil Más Chamba, podremos recopilar los siguientes datos personales de los usuarios, los cuales serán tratados de acuerdo con lo establecido en nuestra política de privacidad:</p>
  <ul>
  <li>Datos de identificación: Nombre completo, correo electrónico, número de teléfono, edad, sexo.</li>
  <li>Información adicional: Fotografía de identificación oficial (INE), comprobante de domicilio con el objetivo de verificar la identidad de los prestadores de servicios registrados en la plataforma y correo electrónico como medio de contacto.</li>
  </ul>

  <h2>Finalidad del tratamiento:</h2>
  <p>Los datos personales recopilados serán utilizados con las siguientes finalidades:</p>
  <ul>
  <li>Registro y autenticación de usuarios: Para la creación de perfiles de usuario y la gestión de sus cuentas en la aplicación.</li>
  <li>Contacto con prestadores de servicios: Para facilitar la comunicación entre usuarios que solicitan servicios y prestadores de servicios registrados en la plataforma.</li>
  <li>Verificación de identidad: Con el fin de garantizar la seguridad y confiabilidad de la información proporcionada por los prestadores de servicios.</li>
  </ul>

  <h2>Base legal para el tratamiento de datos:</h2>

  <p>El tratamiento de los datos personales descritos anteriormente se realiza en base al consentimiento expreso otorgado por los usuarios al aceptar los términos y condiciones, así como a lo establecido en la Ley Federal de Protección de Datos Personales en Posesión de Particulares y su reglamento.</p>

  <p><b>Tratamiento de datos</b></p>

  <p> El tratamiento de datos hace referencia a cualquier operación o conjunto de operaciones realizadas sobre los datos personales de los usuarios de nuestra aplicación móvil, Más Chamba, ya sea de forma automatizada o manual. Estas operaciones incluyen, pero no se limitan a la recopilación, registro, organización, estructuración, almacenamiento, adaptación o modificación, extracción, consulta, utilización, comunicación por transmisión, difusión o cualquier otra forma de habilitación de acceso, restricción, borrado o destrucción de los datos personales.
  <br>Al utilizar nuestra aplicación, los datos personales de los usuarios podrán ser objeto de tratamiento con el fin de brindar los servicios ofrecidos, tales como la creación de perfiles de usuario, la gestión de la interacción entre prestadores de servicios y usuarios, la verificación de identidad, la comunicación de novedades y promociones, entre otras finalidades establecidas en nuestra política de privacidad.
  <br>Es importante destacar que el tratamiento de datos se realizará de conformidad con lo dispuesto en la Ley Federal de Protección de Datos Personales en Posesión de Particulares y su reglamento, así como con las medidas de seguridad necesarias para garantizar la confidencialidad, integridad y disponibilidad de la información recopilada.
  <br>Al aceptar los términos y condiciones de nuestra aplicación, los usuarios otorgan su consentimiento para el tratamiento de sus datos personales de acuerdo con lo establecido en esta sección y la política de privacidad correspondiente.</p>

  <p><b>Consentimiento del titular</b></p>

  <p>Al utilizar nuestra aplicación móvil, Más Chamba, el usuario reconoce y acepta la importancia de su privacidad y protección de datos personales. Es imprescindible obtener el consentimiento expreso de los titulares de los datos personales antes de recopilar y utilizar su información. El consentimiento del titular debe ser informado, libre y voluntario, sin que exista coerción o presión por parte de la empresa desarrolladora de la aplicación.
  <br>Al registrarse y utilizar nuestra aplicación, el usuario está otorgando de manera libre su consentimiento para que sus datos personales sean tratados de acuerdo con lo establecido en los términos y condiciones y en la política de privacidad de la aplicación. Asimismo, al proporcionar datos personales y utilizar los servicios ofrecidos, el usuario manifiesta estar en pleno conocimiento de los fines para los cuales se recopilan y utilizan sus datos personales.
  <br>Es importante destacar que el usuario tiene derecho en todo momento a revocar su consentimiento para el tratamiento de sus datos personales, así como a ejercer sus derechos de acceso, rectificación, cancelación y oposición, de acuerdo con lo establecido en la normativa vigente.
  <br> Así, al aceptar los términos y condiciones de Más Chamba, el usuario está manifestando de manera expresa su consentimiento para que sus datos personales sean tratados de acuerdo con lo establecido en esta sección y en la política de privacidad de la aplicación.</p>

  <p><b>Finalidad de tratamiento</b></p>
  <p>Los datos personales recopilados a través de nuestra aplicación móvil, Más Chamba serán tratados con las siguientes finalidades:</p>
  <ul>
  <li>Registro de usuarios: Los datos personales serán utilizados para crear y gestionar los perfiles de los usuarios de la aplicación, garantizando una experiencia personalizada y segura.</li>
  <li>Conexión entre usuarios y prestadores de servicios: Facilitar la comunicación y coordinación entre los usuarios que solicitan servicios y los prestadores de servicios registrados en la plataforma.</li>
  <li>Verificación de identidad: Utilizar los datos personales proporcionados, como la fotografía de identificación oficial (INE) y/o el comprobante de domicilio, para verificar y garantizar la identidad de los prestadores de servicios registrados.</li>
  <li>Mejora de los servicios: Utilizar la información recopilada para analizar y mejorar los servicios ofrecidos en la aplicación, adaptándolos a las necesidades y preferencias de los usuarios.</li>
  <li>Comunicación de novedades y promociones: Enviar comunicaciones sobre novedades, actualizaciones y promociones relacionadas con la aplicación y los servicios prestados, siempre y cuando el usuario haya otorgado su consentimiento para recibir dichas comunicaciones.</li>
  <li>Cumplimiento de obligaciones legales: Cumplir con las obligaciones legales y regulatorias en materia de protección de datos personales y demás normativa aplicable en México.</li>
  </ul>
  <p>Es importante destacar que los datos personales recopilados solo serán utilizados para las finalidades descritas anteriormente, las cuales están alineadas con el correcto funcionamiento de la aplicación y la prestación de los servicios ofrecidos a los usuarios.
  Al aceptar los términos y condiciones de Más Chamba, el usuario manifiesta su consentimiento para que sus datos personales sean tratados de acuerdo con las finalidades establecidas en esta sección y en la política de privacidad correspondiente.</p>

  <p><b>Medidas de seguridad</b></p>
  <p>En Más Capacitación, nos tomamos muy en serio la protección de los datos personales de nuestros usuarios y empleamos medidas de seguridad técnicas, administrativas y físicas para garantizar la confidencialidad, integridad y disponibilidad de la información recopilada. A continuación, detallamos algunas de las medidas de seguridad implementadas:</p>
  <ul>
  <li>Encriptación de datos: Utilizamos tecnologías de encriptación para proteger los datos personales durante la transmisión y almacenamiento en nuestros sistemas.</li>
  <li>Acceso restringido: Limitamos el acceso a los datos personales únicamente a aquellos empleados autorizados que necesiten utilizar esta información en el desempeño de sus funciones.</li>
  <li>Seguimiento y monitoreo: Realizamos un seguimiento constante y monitoreo de las actividades relacionadas con el tratamiento de datos personales para detectar y prevenir posibles incidentes de seguridad.</li>
  <li>Actualizaciones y parches de seguridad: Mantenemos nuestros sistemas y software actualizados con las últimas actualizaciones de seguridad y parches para mitigar posibles vulnerabilidades.</li>
  <li>Capacitación del personal: Brindamos capacitación periódica a nuestro personal sobre la importancia de la protección de datos y las medidas de seguridad implementadas en la empresa.</li>
  </ul>
  <p>Es importante señalar que, a pesar de todas las medidas de seguridad implementadas, ningún sistema puede garantizar una protección absoluta contra posibles violaciones de seguridad. En caso de que ocurra algún incidente de seguridad, nos comprometemos a informar a los usuarios afectados y a tomar las medidas necesarias para mitigar los posibles impactos.
  <br>Al aceptar los términos y condiciones de la aplicación móvil Más Chamba, el usuario está manifestando su consentimiento para que sus datos personales sean tratados de acuerdo con las medidas de seguridad descritas en esta sección.</p>
  <p><b>Transferencia de datos</b></p>
  <p>En Más Capacitación, podríamos realizar transferencias de datos personales a terceros con el fin de cumplir con las finalidades establecidas en los términos y condiciones y la política de privacidad de la aplicación. En caso de transferencia de datos a terceros, nos comprometemos a seguir los procedimientos y medidas de seguridad necesarios para garantizar la protección de los datos personales de nuestros usuarios.
  <ul>
  <li>Finalidades de la transferencia: Cualquier transferencia de datos personales a terceros se realizará únicamente con el propósito de cumplir con las finalidades establecidas en los términos y condiciones de la aplicación, como la facilitación de servicios, verificación de identidad, análisis de datos, entre otros.</li>
  <li>Base legal: Las transferencias de datos a terceros se llevarán a cabo en cumplimiento con lo dispuesto en la normativa vigente en materia de protección de datos personales y respetando los principios de licitud, consentimiento, información, calidad, finalidad, lealtad, proporcionalidad y responsabilidad en el tratamiento de datos.</li>
  <li>Medidas de seguridad: Antes de realizar cualquier transferencia de datos personales, aseguraremos que se establezcan acuerdos de confidencialidad y seguridad con los terceros receptores, con el objetivo de garantizar la protección de los datos y el cumplimiento de las normas de privacidad.</li>
  <li>Consentimiento del titular: En caso de que sea necesario obtener el consentimiento expreso de los titulares de los datos para realizar la transferencia a terceros, nos aseguraremos de obtener dicho consentimiento de forma previa y debidamente informada.</li>
  </ul>
  <p>Es importante destacar que las transferencias de datos a terceros solo se realizarán cuando sea estrictamente necesario para cumplir con las finalidades establecidas en los términos y condiciones de la aplicación, asegurando en todo momento la protección de la privacidad y seguridad de los datos personales de nuestros usuarios.
  <br>Al aceptar los términos y condiciones de Más Chamba, el usuario está manifestando su consentimiento para que sus datos puedan ser transferidos a terceros de acuerdo con lo establecido en esta sección y la política de privacidad correspondiente.</p>
  <p><b>Responsable del tratamiento</b></p>
  <p>El responsable del tratamiento de los datos personales recopilados a través de la aplicación móvil Más Chamba es Más Capacitación, con domicilio en Ariel #203 Colonia Satélite, Oaxaca México.
  <br>Más Capacitación actúa como responsable del tratamiento de los datos personales de los usuarios de la aplicación y se compromete a garantizar el cumplimiento de la normativa vigente en materia de protección de datos personales en México, así como a implementar las medidas de seguridad necesarias para proteger la privacidad y confidencialidad de la información recopilada.</p>
  <p><b>Las responsabilidades de Más Capacitación como responsable del tratamiento de datos incluyen:</b></p>
  <ul>
  <li>Recopilar y procesar de manera adecuada los datos personales de los usuarios de acuerdo con las finalidades establecidas en los términos y condiciones de la aplicación.</li>
  <li>Implementar medidas de seguridad técnicas, administrativas y físicas para proteger los datos personales contra posibles riesgos, asegurando así la integridad y confidencialidad de la información.</li>
  <li>Respetar y garantizar los derechos de los titulares de los datos, como el acceso, rectificación, cancelación u oposición al tratamiento de sus datos personales.</li>
  </ul>
  <p>En caso de tener alguna consulta o reclamación relacionada con el tratamiento de datos personales, los usuarios pueden contactar al responsable del tratamiento a través de los mecanismos de contacto disponibles en la aplicación.
  <br>Al aceptar los términos y condiciones de Más Chamba, el usuario reconoce y acepta que Más Capacitación actúa como responsable del tratamiento de sus datos personales de acuerdo con lo establecido en esta sección y en la política de privacidad correspondiente.</p>
  <p><b>Encargado de tratamiento</b></p>
  <p> En determinadas circunstancias, Más Capacitación podrá contratar a terceros para llevar a cabo operaciones de tratamiento de datos personales en nombre de la empresa. En estos casos, el tercero que realice el tratamiento de los datos en nombre y por cuenta de Más Capacitación será considerado como el Encargado del tratamiento.
  <br>El encargado del tratamiento se comprometerá a cumplir con las disposiciones de protección de datos personales aplicables y a implementar las medidas de seguridad necesarias para proteger la información de los usuarios de la aplicación móvil Más Chamba.</p>
  <p><b>A continuación se detallan las responsabilidades del Encargado del tratamiento:</b></p>
  <ul>
  <li>Procesar los datos personales únicamente de acuerdo con las instrucciones proporcionadas por Más Capacitación y de conformidad con las finalidades establecidas en los términos y condiciones de la aplicación.</li>
  <li>Adoptar las medidas de seguridad técnicas y organizativas necesarias para proteger los datos personales, asegurando la confidencialidad, integridad y disponibilidad de la información.</li>
  <li>No transferir los datos personales a terceros sin la autorización previa y por escrito de Más Capacitación, salvo que exista una obligación legal que así lo requiera.</li>
  <li>Colaborar con Más Capacitación en caso de solicitudes de los titulares de los datos relacionadas con el ejercicio de sus derechos ARCO, facilitando el acceso, rectificación, cancelación u oposición al tratamiento de los datos.</li>
  </ul>
  <p>En caso de que Más Capacitación contrate a un Encargado del tratamiento para gestionar los datos personales de los usuarios, se asegurará de firmar un contrato que establezca las obligaciones y responsabilidades del Encargado del tratamiento en materia de protección de datos.
  <br>Al aceptar los términos y condiciones de Más Chamba, el usuario reconoce y acepta que, en caso de ser necesario, Más Capacitacióñ podrá contratar a terceros como Encargados del tratamiento de datos personales de acuerdo con lo establecido en esta sección y en la política de privacidad correspondiente.</p>
  <p><b>Responsabilidades y límites</b></p>
  <p>En Más Chamba, como plataforma comprometida con la integridad y seguridad de nuestros usuarios, deseamos enfatizar que no nos hacemos responsables por el uso indebido que los visitantes puedan dar a la información pública de los prestadores de servicio que se encuentren en nuestra plataforma. Sin embargo, asumimos el compromiso de tomar las medidas necesarias en caso de que ser notificados con reportes de comportamiento inapropiado por parte de algún prestador de servicio.
  <br>En situaciones donde se identifiquen acciones que contravengan nuestras normas y afecten la experiencia de los usuarios, nos reservamos el derecho de aplicar medidas correctivas que podrían llegar a incluir la suspensión indefinida o permanente del prestador de servicio involucrado. En determinados casos de gravedad, nos comprometemos a informar a las autoridades pertinentes para colaborar en la resolución de la situación.
  <br>En Más Chamba, velamos por la transparencia, el respeto mutuo y un entorno seguro para todos los usuarios, por lo que nos comprometemos a actuar con prontitud y diligencia en caso de que se presenten situaciones que afecten negativamente la confianza y la calidad de nuestros servicios.</p>
  <p><b>Actualización y modificación de los términos y condiciones</b></p>
  <p>En Más Chamba, nos comprometemos a mantener actualizados nuestros términos y condiciones para reflejar de manera precisa y transparente las políticas y normativas relacionadas con la protección de datos y el uso de la aplicación.</p>
  <p><b>A continuación, explicamos cómo se comunicarán y aplicarán las actualizaciones en los términos y condiciones:</b></p>
  <ul>
  <li>Notificación de actualizaciones: En caso de que realicemos cambios en los términos y condiciones, notificaremos a los usuarios a través de un aviso destacado en la aplicación, un mensaje emergente al momento de acceder a la plataforma o mediante un correo electrónico enviado a la dirección proporcionada por el usuario.</li>
  <li>Aceptación de las actualizaciones: Al recibir la notificación de actualización de los términos y condiciones, los usuarios deberán revisar los cambios realizados. Al continuar utilizando la aplicación después de haber sido informados sobre las actualizaciones, se considerará que los usuarios aceptan las modificaciones realizadas.</li>
  <li>Disponibilidad de los términos actualizados: Los términos y condiciones actualizados estarán siempre disponibles para su consulta en la aplicación, de manera que los usuarios puedan acceder a la versión más reciente en cualquier momento.</li>
  <li>Fecha de vigencia de las actualizaciones: Cada vez que se realice una actualización de los términos y condiciones, se indicará claramente la fecha de vigencia de los cambios para que los usuarios puedan conocer cuándo entraron en vigor.</li>
  </ul>
  <p>Es responsabilidad de los usuarios revisar periódicamente los términos y condiciones de la aplicación para estar al tanto de cualquier modificación que pueda afectar su relación con la plataforma. En caso de desacuerdo con los cambios realizados, los usuarios podrán optar por dejar de utilizar la aplicación.
  <br> Al aceptar los términos y condiciones de Más Chamba, los usuarios reconocen y aceptan el proceso de actualización y modificación descrito en esta sección.</p>

  <p><b>Revocación del consentimiento</b></p>
  <p>En Más Chamba, reconocemos la importancia del consentimiento del usuario para el tratamiento de sus datos personales y respetamos su derecho a revocar dicho consentimiento en cualquier momento.</p> 
  <p><b>A continuación, te explicamos el proceso mediante el cual los usuarios pueden revocar el consentimiento otorgado para el tratamiento de sus datos personales:</b></p>
  <ul>
  <li>Procedimiento de revocación: Los usuarios que deseen revocar su consentimiento para el tratamiento de sus datos personales en la aplicación pueden hacerlo enviando una solicitud por escrito al correo electrónico cursos@mascapacitacion.com.mx. En la solicitud, el usuario deberá identificarse de manera clara y proporcionar la información necesaria para verificar su identidad y la titularidad de los datos personales.</li>
  <li>Plazo de respuesta: Nos comprometemos a atender las solicitudes de revocación de consentimiento en un plazo no mayor a 5 días hábiles a partir de la recepción de la solicitud. En caso de requerir información adicional o aclaración, nos pondremos en contacto con el usuario para completar el proceso de revocación.</li>
  <li>Efectos de la revocación: Una vez que el usuario haya revocado su consentimiento para el tratamiento de sus datos personales, se dejará de usar y procesar dichos datos para las finalidades para las cuales se había otorgado el consentimiento. Sin embargo, es importante tener en cuenta que la revocación del consentimiento no afectará la legalidad del tratamiento realizado con anterioridad a la revocación.</li>
  <li>Confirmación de la revocación: Una vez completado el proceso de revocación, el usuario recibirá una confirmación por escrito de parte de Más Chamba indicando que su solicitud ha sido atendida y que sus datos personales ya no serán objeto de tratamiento conforme al consentimiento revocado.</li>
  </ul>
  <p><b>Es importante que los usuarios comprendan que tener la facultad de revocar su consentimiento les otorga mayor control sobre sus datos personales y su privacidad en la aplicación.
  <br>Nos comprometemos a respetar este derecho y a garantizar que el proceso de revocación sea claro, sencillo y eficiente para todos los usuarios de Más Chamba.</b></p>
`;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    console.log('Modal de políticas de privacidad y seguridad');
  }

  async close() {
    await this.modalCtrl.dismiss();
  }

}
